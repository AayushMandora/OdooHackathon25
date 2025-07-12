const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { createSwap, getSwaps, updateStatus, deleteSwap } = require("../controller/swapController");

router.post("/create", authenticateToken(["user"]), createSwap);
router.get("/", authenticateToken(["user", "admin"]), getSwaps);
router.put("/:id", authenticateToken(["user", "admin"]), updateStatus);
router.delete("/:id", authenticateToken(["user", "admin"]), deleteSwap);

module.exports = router;