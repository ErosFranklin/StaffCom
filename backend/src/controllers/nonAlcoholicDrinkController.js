const nonAlcoholicDrinkService = require('../services/NonAlcoholicDrinkService');

class NonAlcoholicDrinkController {
  async create(req, res) {
    try {
      const drink = await nonAlcoholicDrinkService.create(req.body);
      res.status(201).json(drink);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async findAll(req, res) {
    try {
      const drinks = await nonAlcoholicDrinkService.findAll();
      res.json(drinks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async findById(req, res) {
    try {
      const drink = await nonAlcoholicDrinkService.findById(req.params.id);
      res.json(drink);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const drink = await nonAlcoholicDrinkService.update(req.params.id, req.body);
      res.json(drink);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await nonAlcoholicDrinkService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new NonAlcoholicDrinkController();
