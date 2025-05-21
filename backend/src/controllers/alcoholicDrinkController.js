const alcoholicDrinkService = require("../services/alcoholicDrinkService");

const alcoholicDrinkController = {
    async getByDrinkId(req, res) {
        try {
            const data = await alcoholicDrinkService.getAlcoholicByDrinkId(req.params.id);
            res.json(data);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async create(req, res) {
        try {
            const created = await alcoholicDrinkService.createAlcoholicDrink(req.body);
            res.status(201).json(created);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await alcoholicDrinkService.updateAlcoholicDrink(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const result = await alcoholicDrinkService.deleteAlcoholicDrink(req.params.id);
            res.json(result);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};

module.exports = alcoholicDrinkController;