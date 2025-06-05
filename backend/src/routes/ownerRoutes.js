const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const ownerController = require("../controllers/ownerController");

const router = express.Router();

// Owner routes
router.post("/signUp", ownerController.signUp);
router.post("/signIn", ownerController.signIn);
router.get("/", ownerController.getAll);
router.get("/:ownerId", ownerController.getById);
router.get("/profile", authenticateJWT, ownerController.getProfile);
router.put("/profile", authenticateJWT, ownerController.updateOtherFields);
router.put("/redefinePassword", authenticateJWT, ownerController.updatePassword);
router.delete("/excludeProfile", authenticateJWT, ownerController.excludeAccount);
router.patch("/reactivateProfile", ownerController.reactivateAccount);

// Owner routes related to managers
router.post("/addManager", authenticateJWT, ownerController.addManager);
router.get("/my-managers", authenticateJWT, ownerController.showAllManagers);
router.delete("/:id/excludeManager", authenticateJWT, ownerController.excludeManager);
router.patch("/reactivateManager", authenticateJWT, ownerController.reactivateManager);

module.exports = router;