const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden: invalid Token" });

            switch (decoded.userType) {
                case "owner": // owners token
                    req.ownerId = decoded.ownerId;
                    break;
                case "manager": // managers token
                    req.managerId = decoded.managerId;
                    break;
                case "waiter":
                    req.waiterId = decoded.waiterId;
                    break;
                case "cook":
                    req.cookId = decoded.cookId;
                    req.cookRole = decoded.cookRole;
                    break;
                default:
                    return res.status(400).json({ message: "Unknown user type" });
            }

            next();
        });
    } else {
        return res.status(401).json({ message: "Unathorized: Token required" });
    }
}

module.exports = authenticateJWT;