const AlcoholicDrinkService = require('../services/AlcoholicDrinkService');
const cloudinary = require('../config/cloudinaryConnection');

const AlcoholicDrinkController = {
  async create(req, res) {
    try {
      if (!req.file) throw new Error('Imagem é obrigatória');
      const newDrink = await AlcoholicDrinkService.create({
        ...req.body,
        drinkImg: req.file.path || req.file.secure_url || req.file.location,
        imagePublicId: req.file.filename || req.file.public_id
      });
      res.status(201).json(newDrink);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const drinks = await AlcoholicDrinkService.getAll();
      res.json(drinks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const drink = await AlcoholicDrinkService.findById(req.params.id);
      res.json(drink);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      if (req.file) {
        const oldDrink = await AlcoholicDrinkService.findById(req.params.id);
        if (oldDrink.imagePublicId) {
          await cloudinary.uploader.destroy(oldDrink.imagePublicId);
        }
        req.body.drinkImg = req.file.path || req.file.secure_url || req.file.location || '';
        req.body.imagePublicId = req.file.filename || req.file.public_id || '';
      }
      const updated = await AlcoholicDrinkService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const drink = await AlcoholicDrinkService.findById(req.params.id);
      if (drink.imagePublicId) {
        await cloudinary.uploader.destroy(drink.imagePublicId);
      }
      await AlcoholicDrinkService.delete(req.params.id);
      res.json({ message: 'Bebida alcoólica removida com sucesso.' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};

module.exports = AlcoholicDrinkController;
