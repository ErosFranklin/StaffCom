const alcoholicDrinkService = require('../services/AlcoholicDrinkService');

class AlcoholicDrinkController {
  async create(req, res) {
    try {
      const drink = await alcoholicDrinkService.create(req.body);
      res.status(201).json(drink);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async findAll(req, res) {
    try {
      const drinks = await alcoholicDrinkService.findAll();
      res.json(drinks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async findById(req, res) {
    try {
      const drink = await alcoholicDrinkService.findById(req.params.id);
      res.json(drink);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const drink = await alcoholicDrinkService.update(req.params.id, req.body);
      res.json(drink);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await alcoholicDrinkService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new AlcoholicDrinkController();
