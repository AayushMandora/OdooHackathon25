const Feedback = require("../models/feedback");
const User = require("../models/user");
const { upload } = require("../utils/multer");
const { generateImageUrl } = require("../utils/utils");

const createFeedback = async (req, res) => {
    try {
        const payload = { ...req.body };
        const user = req.user;

        payload.fromUser = user.id;

        const feedback = new Feedback(payload);
        await feedback.save();

        res.status(201).json({ message: "Feedback created successfully", feedback });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    createFeedback,
}