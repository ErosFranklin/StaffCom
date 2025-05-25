const express = require("express");
const router = express.Router();
const alcoholicDrinkController = require('../controllers/AlcoholicDrinkController');

const uploadDrinkImage = require('../middlewares/uploadImage.js');

router.get("/get-all", alcoholicDrinkController.findAll);

router.get("/get-by/:id", alcoholicDrinkController.findById);

router.post("/create",uploadDrinkImage(), alcoholicDrinkController.create);

router.put("/update-by/:id",uploadDrinkImage(), alcoholicDrinkController.update);

router.delete("/delete-by/:id", alcoholicDrinkController.delete);

module.exports = router;