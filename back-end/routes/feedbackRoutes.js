const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { createFeedback } = require("../controller/feedbackController");

router.post("/create", authenticateToken(["user"]), createFeedback);

module.exports = router;