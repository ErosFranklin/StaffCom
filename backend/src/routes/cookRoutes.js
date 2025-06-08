const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const cookController = require("../controllers/cookController");

const router = express.Router();

// Cook routes
router.post("/signIn", cookController.signIn);
router.get("/profile", authenticateJWT, cookController.getProfile);
router.put("/profile", authenticateJWT, cookController.updateOthersFields);
router.put("/redefinePassword", authenticateJWT, cookController.updatePassword);

module.exports = router;