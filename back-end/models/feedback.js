const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    feedback: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
}, { timestamps: true })

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;