const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { registerUser, loginUser, getUser, getUsers, getUserById, updateUser, blockUser } = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateToken(["user", "admin"]), getUser);
router.get("/", authenticateToken(["user", "admin"]), getUsers);
router.get("/without-auth", getUsers);
router.get("/:id", authenticateToken(["user", "admin"]), getUserById);
router.put("/:id", authenticateToken(["user", "admin"]), updateUser);
router.put("/block/:id", authenticateToken(["admin"]), blockUser);

module.exports = router;