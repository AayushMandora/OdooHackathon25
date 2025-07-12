const express = require("express");
const router = express.Router();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const swapRoutes = require("./routes/swapRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/swap", swapRoutes);
router.use("/feedback", feedbackRoutes);

module.exports = router;