const Swap = require("../models/swap");
const User = require("../models/user");
const { generateImageUrl } = require("../utils/utils");

const createSwap = async (req, res) => {
    try {
        const payload = req.body;
        const { createdFor } = payload;
        const user = req.user;

        const createdForUser = await User.findById(createdFor);

        if (!createdForUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const swap = new Swap({
            ...payload,
            createdBy: user.id,
        });

        await swap.save();
        res.status(201).json({ message: "Swap created successfully", swap });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getSwaps = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = "", search = "" } = req.query;

        const query = {};

        if (req.user.role === "user") {
            query.createdBy = req.user.id;
            query.createdFor = req.user.id;
        }

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { createdBy: { $regex: search, $options: "i" } },
                { createdFor: { $regex: search, $options: "i" } },
                { skillOffered: { $regex: search, $options: "i" } },
                { skillWanted: { $regex: search, $options: "i" } }
            ];
        }

        const totalSwaps = await Swap.countDocuments(query);
        const totalPages = Math.ceil(totalSwaps / limit);

        let swaps = await Swap.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("createdBy", "name profileImage")
            .populate("createdFor", "name profileImage");

        swaps = swaps.map(swap => {
            const createdBy = swap.createdBy;
            const createdFor = swap.createdFor;
            createdBy.profileImage = createdBy.profileImage ? generateImageUrl(createdBy.profileImage) : null;
            createdFor.profileImage = createdFor.profileImage ? generateImageUrl(createdFor.profileImage) : null;
            return {
                ...swap,
                createdBy,
                createdFor
            };
        });

        res.status(200).json({ message: "Swaps fetched successfully", swaps, totalPages, totalSwaps });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const { status } = req.body;

        const swap = await Swap.findOne({ _id: id, createdFor: user.id });

        if (!swap) {
            return res.status(404).json({ message: "Swap not found" });
        }

        swap.status = status;
        await swap.save();

        res.status(200).json({ message: "Swap status updated successfully", swap });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// delete swap if not accepted
const deleteSwap = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const swap = await Swap.findOne({ _id: id, createdFor: user.id });

        if (!swap) {
            return res.status(404).json({ message: "Swap not found" });
        }

        if (swap.status !== "pending") {
            return res.status(400).json({ message: "You can only delete pending swaps" });
        }

        await swap.deleteOne();
        res.status(200).json({ message: "Swap deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createSwap,
    getSwaps,
    updateStatus,
    deleteSwap,
}