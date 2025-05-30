const recipesRepository = require("../repositories/recipesRepository");
const Recipe = require("../models/Recipes");

const recipesService = {
    async getAllRecipes() {
        const recipes = await recipesRepository.findAll();
        return recipes;
    },

    async getRecipeById(id) {
        const recipe = await recipesRepository.findById(id);
        if (!recipe) throw new Error("Receita não encontrada!");
        return recipe;
    },

    async create(newRecipeData) {
        if (!newRecipeData.foodName) {
            throw new Error("O nome da receita é obrigatório!");
        }
        if (!newRecipeData.value) {
            throw new Error("O valor da receita é obrigatório!");
        }

        const recipe = new Recipe(newRecipeData);
        const result = await recipesRepository.create(recipe);
        const createdRecipe = await recipesRepository.findById(result.insertId);

        return {
            message: "Receita criada com sucesso!",
            recipe: createdRecipe
        };
    },

    async update(id, updatedData) {
        const existingRecipe = await recipesRepository.findById(id);
        if (!existingRecipe) throw new Error("Receita não encontrada para atualização!");

        await recipesRepository.update(id, updatedData);
        return { message: "Receita atualizada com sucesso!" };
    },

    async delete(id) {
        const existingRecipe = await recipesRepository.findById(id);
        if (!existingRecipe) throw new Error("Receita não encontrada para exclusão!");

        await recipesRepository.delete(id);
        return { message: "Receita excluída com sucesso!" };
    }
};

module.exports = recipesService;
