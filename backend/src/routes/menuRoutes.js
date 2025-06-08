const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/new-item/:itemId", authenticateJWT, menuController.addItemToMenu);
router.get("/owner/:ownerId", menuController.getFullMenuByOwnerId);
router.get("/my-menu", authenticateJWT, menuController.getFullMenu);
router.get("/:menuId", menuController.getById);
router.get("/item/:itemId", menuController.getDetailsItemById);
router.get("/", menuController.getAll);
router.put("/:menuId/item/:itemId", authenticateJWT, menuController.update);
router.delete("/:menuId", authenticateJWT, menuController.removeItemFromMenu);

module.exports = router;