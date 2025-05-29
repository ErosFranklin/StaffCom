const express = require("express");
const router = express.Router();
const alcoholicDrinkController = require('../controllers/AlcoholicDrinkController');
const authenticateJWT = require("../middlewares/authenticateJWT.js");
const uploadDrinkImage = require('../middlewares/uploadImage.js');

router.get("/", alcoholicDrinkController.findAll);
router.get("/:id", alcoholicDrinkController.findById);
router.post("/", authenticateJWT, uploadDrinkImage(), alcoholicDrinkController.create);
router.put("/:id", authenticateJWT, uploadDrinkImage(), alcoholicDrinkController.update);
router.delete("/:id", authenticateJWT, alcoholicDrinkController.delete);

module.exports = router;