const express = require("express");
const router = express.Router();

// Importing all existing routes
const ownerRoutes = require("./ownerRoutes");
const managerRoutes = require("./managerRoutes");

// Defining base paths for each route
router.use("/owners", ownerRoutes);
router.use("/managers", managerRoutes);

module.exports = router;