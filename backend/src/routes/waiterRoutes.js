const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const waiterController = require("../controllers/waiterController");

const router = express.Router();

// Waiter routes
router.post("/signIn", waiterController.signIn);
router.get("/profile", authenticateJWT, waiterController.getProfile);
router.put("/profile", authenticateJWT, waiterController.updateOthersFields);
router.put("/redefinePassword", authenticateJWT, waiterController.updatePassword);

module.exports = router;