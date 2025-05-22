const express = require("express");
const router = express.Router();
const nonAlcoholicDrinkController = require("../controllers/NonAlcoholicDrinkController");

router.get("/get-all", nonAlcoholicDrinkController.findAll);
router.get("/get-by/:id", nonAlcoholicDrinkController.findById);
router.post("/create", nonAlcoholicDrinkController.create);
router.put("/update-by/:id", nonAlcoholicDrinkController.update);
router.delete("/delete-by/:id", nonAlcoholicDrinkController.delete);

module.exports = router;