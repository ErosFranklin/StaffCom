const express = require("express");
const router = express.Router();
const nonAlcoholicDrinkController = require("../controllers/nonAlcoholicDrinkController");

router.get("/get-by/:id", nonAlcoholicDrinkController.getByDrinkId);
router.post("/create", nonAlcoholicDrinkController.create);
router.put("/update-by/:id", nonAlcoholicDrinkController.update);
router.delete("/delete-by/:id", nonAlcoholicDrinkController.delete);

module.exports = router;