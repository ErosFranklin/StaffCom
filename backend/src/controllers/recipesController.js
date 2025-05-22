const recipesService = require("../services/recipesService");

const recipesController = {
    async getAllRecipes(req, res) {
        try {
            const recipes = await recipesService.getAllRecipes();
            return res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async getRecipeById(req, res) {
        try {
            const recipeId = parseInt(req.params.id);
            const recipe = await recipesService.getRecipeById(recipeId);
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async createRecipe(req, res) {
        try {
            const result = await recipesService.createRecipe(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updateRecipe(req, res) {
        try {
            const recipeId = parseInt(req.params.id);
            const result = await recipesService.updateRecipe(recipeId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async deleteRecipe(req, res) {
        try {
            const recipeId = parseInt(req.params.id);
            const result = await recipesService.deleteRecipe(recipeId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
};

module.exports = recipesController;
