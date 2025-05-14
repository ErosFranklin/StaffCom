const express = require("express");
const router = express.Router();

// Importing all existing routes
const ownerRoutes = require("./ownerRoutes");

// Defining base paths for each route
router.use("/owners", ownerRoutes);

module.exports = router;