const DrinkService = require('../services/drinkService.js');

const DrinkController = {
    async create(req, res) {
        try {
            const newDrink = await DrinkService.create(req.body);
            res.status(201).json(newDrink);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const drinks = await DrinkService.getAll();
            res.json(drinks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const drink = await DrinkService.getById(req.params.id);
            res.json(drink);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await DrinkService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await DrinkService.delete(req.params.id);
            res.json({ message: 'Bebida removida com sucesso.' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = DrinkController;