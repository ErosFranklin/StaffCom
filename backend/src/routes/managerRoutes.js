const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const managerController = require("../controllers/managerController");

const router = express.Router();

// Manager routes
router.post("/signIn", managerController.signIn);
router.get("/profile", authenticateJWT, managerController.getProfile);
router.put("/profile", authenticateJWT, managerController.updateOthersFields);
router.put("/redefinePassword", authenticateJWT, managerController.updatePassword);

// Manager routes related to waiters
router.post("/addWaiter", authenticateJWT, managerController.addWaiter);
router.get("/waiters/:managerId", managerController.getAllWaitersByManagerId);
router.get("/my-waiters", authenticateJWT, managerController.showAllWaiters);
router.delete("/:waiterId/excludeWaiter", authenticateJWT, managerController.excludeWaiter);
router.patch("/reactivateWaiter", authenticateJWT, managerController.reactivateWaiter);

// Manager routes related to cooks
router.post("/addCook", authenticateJWT, managerController.addCook);
router.get("/cooks/:managerId", managerController.getAllCooksByManagerId);
router.get("/my-cooks", authenticateJWT, managerController.showAllCooks);
router.put('/switch-role', authenticateJWT, managerController.switchCookRoles);
router.delete("/:cookId/excludeCook", authenticateJWT, managerController.excludeCook);
router.patch("/reactivateCook", authenticateJWT, managerController.reactivateCook);

module.exports = router;