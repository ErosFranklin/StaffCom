const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const recipesController = require("../controllers/recipesController");
const uploadRecipeImage = require('../middlewares/uploadImage.js');

const router = express.Router();

// Public routes
router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipeById);

// Protected routes
router.post("/", authenticateJWT, uploadRecipeImage(), recipesController.create);
router.put("/:id", authenticateJWT, uploadRecipeImage(), recipesController.update);
router.delete("/:id", authenticateJWT, recipesController.delete);

module.exports = router;
