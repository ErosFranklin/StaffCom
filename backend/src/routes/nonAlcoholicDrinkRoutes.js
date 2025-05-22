const express = require("express");
const router = express.Router();
const nonAlcoholicDrinkController = require("../controllers/NonAlcoholicDrinkController");

const uploadDrinkImage = require('../middlewares/uploadImage.js');

router.get("/get-all", nonAlcoholicDrinkController.findAll);

router.get("/get-by/:id", nonAlcoholicDrinkController.findById);

router.post("/create",uploadDrinkImage(), nonAlcoholicDrinkController.create);

router.put("/update-by/:id",uploadDrinkImage(), nonAlcoholicDrinkController.update);

router.delete("/delete-by/:id", nonAlcoholicDrinkController.delete);

module.exports = router;