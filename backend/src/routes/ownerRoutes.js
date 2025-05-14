const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const ownerController = require("../controllers/ownerController");

const router = express.Router();

router.post("/signUp", ownerController.signUp);
router.post("/signIn", ownerController.signIn);
router.get("/profile", authenticateJWT, ownerController.getProfile);
router.put("/profile", authenticateJWT, ownerController.updateOtherFields);
router.put("/redefinePassword", authenticateJWT, ownerController.updatePassword);
router.delete("/profile", authenticateJWT, ownerController.deactivate);
router.patch("/activate", authenticateJWT, ownerController.activate);

module.exports = router;