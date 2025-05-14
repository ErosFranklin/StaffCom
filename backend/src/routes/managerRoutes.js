const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const managerController = require("../controllers/managerController");

const router = express.Router();

router.post("/signIn", managerController.signIn);
router.get("/profile", authenticateJWT, managerController.getProfile);
router.put("/profile", authenticateJWT, managerController.updateOthersFields);
router.put("/redefinePassword", authenticateJWT, managerController.updatePassword);

module.exports = router;