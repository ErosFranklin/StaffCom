const nonAlcoholicDrinkService = require("../services/nonAlcoholicDrinkService");

const nonAlcoholicDrinkController = {
    async getByDrinkId(req, res) {
        try {
            const data = await nonAlcoholicDrinkService.getNonAlcoholicByDrinkId(req.params.id);
            res.json(data);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const created = await nonAlcoholicDrinkService.createNonAlcoholicDrink(req.body);
            res.status(201).json(created);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await nonAlcoholicDrinkService.updateNonAlcoholicDrink(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await nonAlcoholicDrinkService.deleteNonAlcoholicDrink(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

module.exports = nonAlcoholicDrinkController;
