const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    skillOffered: String,
    skillWanted: String,
    message: String,
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
}, { timestamps: true })

const Swap = mongoose.model("Swap", swapSchema);

module.exports = Swap;