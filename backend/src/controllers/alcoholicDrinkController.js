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
      return res.status(201).json(newDrink);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const drinks = await AlcoholicDrinkService.getAll();
      return res.status(200).json(drinks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const drink = await AlcoholicDrinkService.getById(req.params.id);
      return res.status(200).json(drink);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const oldAlcoholic = await AlcoholicDrinkService.getById(req.params.id);
      if (!oldAlcoholic) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      if (req.file) {
        if (oldAlcoholic.imagePublicId) {
          await cloudinary.uploader.destroy(oldAlcoholic.imagePublicId);
        }
        req.body.drinkImg = req.file.path || req.file.secure_url || req.file.location || '';
        req.body.imagePublicId = req.file.filename || req.file.public_id || '';
      } else {
        req.body.drinkImg = oldAlcoholic.drinkImg;
        req.body.imagePublicId = oldAlcoholic.imagePublicId;
      }

      const result = await AlcoholicDrinkService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const alcoholic = await AlcoholicDrinkService.getById(req.params.id);

      if (!alcoholic) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
      if (alcoholic.imagePublicId) {
        await cloudinary.uploader.destroy(alcoholic.imagePublicId);
      }

      const result = await AlcoholicDrinkService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = AlcoholicDrinkController;
