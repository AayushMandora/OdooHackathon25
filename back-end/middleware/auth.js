const jwt = require("jsonwebtoken");

const authenticateToken = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers?.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            if (roles.length > 0 && !roles.includes(user.role)) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.user = user;
            next();
        });
    };
}

module.exports = { authenticateToken };