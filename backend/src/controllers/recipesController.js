const recipesService = require("../services/recipesService");
const cloudinary = require("../config/cloudinaryConnection");

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

    async create(req, res) {
        try {
            const file = req.file || {};
            const newRecipe = {
                ...req.body,
                foodImg: file.path || file.secure_url || file.location || '',
                imagePublicId: file.filename || file.public_id || ''
            };
            const result = await recipesService.create(newRecipe);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const oldRecipe = await recipesService.getRecipeById(req.params.id);
            if (!oldRecipe) {
                return res.status(404).json({ error: "Item não encontrado" });
            }

            if (req.file) {
                if (oldRecipe.imagePublicId) {
                    await cloudinary.uploader.destroy(oldRecipe.imagePublicId);
                }
                req.body.foodImg = req.file.path || req.file.secure_url || req.file.location || '';
                req.body.imagePublicId = req.file.filename || req.file.public_id || '';
            } else {
                req.body.foodImg = oldRecipe.foodImg;
                req.body.imagePublicId = oldRecipe.imagePublicId;
            }

            const result = await recipesService.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const recipe = await recipesService.getRecipeById(req.params.id);

            if (!recipe) {
                return res.status(404).json({ error: "Item não encontrado" });
            }
            if (recipe.imagePublicId) {
                await cloudinary.uploader.destroy(recipe.imagePublicId);
            }

            const result = await recipesService.delete(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = recipesController;
