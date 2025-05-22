const express = require("express");
const router = express.Router();
const alcoholicDrinkController = require('../controllers/AlcoholicDrinkController');

router.get("/get-all", alcoholicDrinkController.findAll);
router.get("/get-by/:id", alcoholicDrinkController.findById);
router.post("/create", alcoholicDrinkController.create);
router.put("/update-by/:id", alcoholicDrinkController.update);
router.delete("/delete-by/:id", alcoholicDrinkController.delete);

module.exports = router;