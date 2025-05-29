const express = require("express");
const router = express.Router();

// Importing all existing routes
const ownerRoutes = require("./ownerRoutes");
const managerRoutes = require("./managerRoutes");
const alcoholicDrinkRoutes = require('./alcoholicDrinkRoutes.js')
const nonAlcoholicDrinkRoutes = require('./nonAlcoholicDrinkRoutes.js')
const appetizerRoutes = require("./appetizerRoutes.js");
const menuRoutes = require("./menuRoutes.js");
const recipesRoutes = require("./recipesRoutes.js");

// Defining base paths for each route
router.use("/owners", ownerRoutes);
router.use("/managers", managerRoutes);
router.use("/alcoholic", alcoholicDrinkRoutes);
router.use("/nonAlcoholic", nonAlcoholicDrinkRoutes);
router.use("/appetizers", appetizerRoutes);
router.use("/menu", menuRoutes);
router.use("/recipes", recipesRoutes);

module.exports = router;