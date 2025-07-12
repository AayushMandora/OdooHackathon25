const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../utils/generateAuthToken");

const registerAdmin = async (req, res) => {
    try {
        const payload = req.body;

        const hashedPassword = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword;

        const admin = new Admin(payload);
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully", admin, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = generateAuthToken({ id: admin._id, role: "admin" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
}