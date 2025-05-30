const express = require("express");
const router = express.Router();
const nonAlcoholicDrinkController = require("../controllers/nonAlcoholicDrinkController.js");
const authenticateJWT = require("../middlewares/authenticateJWT.js");
const uploadDrinkImage = require('../middlewares/uploadImage.js');

router.get("/", nonAlcoholicDrinkController.findAll);
router.get("/:id", nonAlcoholicDrinkController.findById);
router.post("/", authenticateJWT, uploadDrinkImage(), nonAlcoholicDrinkController.create);
router.put("/:id", authenticateJWT, uploadDrinkImage(), nonAlcoholicDrinkController.update);
router.delete("/:id", authenticateJWT, nonAlcoholicDrinkController.delete);

module.exports = router;