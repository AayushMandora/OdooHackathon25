const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    skillsOffered: [String],
    skillsWanted: [String],
    availability: {
        type: String,
        enum: ["weekends", "weekdays", "mornings", "afternoons", "evenings", "nights", "anytime"],
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;