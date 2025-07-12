const User = require("../models/user");
const Feedback = require("../models/feedback");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../utils/generateAuthToken");
const { upload } = require("../utils/multer");
const { generateImageUrl } = require("../utils/utils");

const registerUser = [
    upload.single("profileImage"),
    async (req, res) => {
        try {
            const payload = req.body;
            const profileImage = req.file ? req.file.path : null;

            const hashedPassword = await bcrypt.hash(password, 10);
            payload.password = hashedPassword;
            payload.profileImage = profileImage;

            const user = new User(payload);
            await user.save();
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
];

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.isBlocked) {
            return res.status(401).json({ message: "User is blocked" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateAuthToken({ id: user._id, role: "user" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profileImage = user.profileImage ? generateImageUrl(user.profileImage) : null;
        user.profileImage = profileImage;

        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const query = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { skillsOffered: { $regex: search, $options: "i" } },
                { skillsWanted: { $regex: search, $options: "i" } },
            ]
        }

        if (req.user.role === "user" || !req.user) {
            query.isPrivate = false;
            query.isBlocked = false;
            query.isDeleted = false;
        }

        const totalUsers = await User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);

        let users = await User.find(query)
            .select("-password")
            .skip((page - 1) * limit)
            .limit(limit);

        users = users.map(user => {
            const profileImage = user.profileImage ? generateImageUrl(user.profileImage) : null;
            user.profileImage = profileImage;
            return user;
        });

        res.status(200).json({ message: "Users fetched successfully", users, totalPages, totalUsers });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.user.id || req.params.id;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profileImage = user.profileImage ? generateImageUrl(user.profileImage) : null;
        user.profileImage = profileImage;

        const feedbacks = await Feedback.find({ toUser: id }).populate("fromUser", "name profileImage");

        user.feedbacks = feedbacks.map(feedback => {
            const fromUser = feedback.fromUser;
            const fromUserProfileImage = fromUser.profileImage ? generateImageUrl(fromUser.profileImage) : null;
            fromUser.profileImage = fromUserProfileImage;
            return {
                fromUser,
                feedback: feedback.feedback,
                rating: feedback.rating,
            };
        });

        res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateUser = [
    upload.single("profileImage"),
    async (req, res) => {
        try {
            const payload = req.body;
            const id = req.user.id;

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const profileImage = req.file ? req.file.path : user.profileImage;
            payload.profileImage = profileImage;

            if (payload.password) {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password = hashedPassword;
            }

            Object.assign(user, payload);
            await user.save();

            res.status(200).json({ message: "User updated successfully", updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
]

const blockUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBlocked = true;
        await user.save();

        res.status(200).json({ message: "User blocked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUsers,
    getUserById,
    updateUser,
    blockUser,
}