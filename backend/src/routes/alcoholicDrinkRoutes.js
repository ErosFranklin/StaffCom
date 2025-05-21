const express = require("express");
const router = express.Router();
const alcoholicDrinkController = require("../controllers/alcoholicDrinkController");

router.get("/get-by/:id", alcoholicDrinkController.getByDrinkId);
router.post("/create", alcoholicDrinkController.create);
router.put("/update-by/:id", alcoholicDrinkController.update);
router.delete("/delete-by/:id", alcoholicDrinkController.delete);

module.exports = router;