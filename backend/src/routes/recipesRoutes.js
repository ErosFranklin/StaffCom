const express = require("express");
const authenticateJWT = require("../middlewares/authenticateJWT");
const recipesController = require("../controllers/recipesController");

const router = express.Router();

// Public routes
router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipeById);

// Protected routes
router.post("/", authenticateJWT, recipesController.createRecipe);
router.put("/:id", authenticateJWT, recipesController.updateRecipe);
router.delete("/:id", authenticateJWT, recipesController.deleteRecipe);

module.exports = router;
