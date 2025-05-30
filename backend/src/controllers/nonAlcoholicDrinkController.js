const NonAlcoholicDrinkService = require('../services/NonAlcoholicDrinkService');
const cloudinary = require('../config/cloudinaryConnection');

const NonAlcoholicDrinkController = {
  async create(req, res) {
    try {
      if (!req.file) throw new Error('Imagem é obrigatória');
      const newDrink = await NonAlcoholicDrinkService.create({
        ...req.body,
        drinkImg: req.file.path || req.file.secure_url || req.file.location,
        imagePublicId: req.file.filename || req.file.public_id
      });
      return res.status(201).json(newDrink);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const drinks = await NonAlcoholicDrinkService.getAll();
      return res.status(200).json(drinks);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const drink = await NonAlcoholicDrinkService.getById(req.params.id);
      return res.status(200).json(drink);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const oldNonAlcoholic = await NonAlcoholicDrinkService.getById(req.params.id);
      if (!oldNonAlcoholic) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      if (req.file) {
        if (oldNonAlcoholic.imagePublicId) {
          await cloudinary.uploader.destroy(oldNonAlcoholic.imagePublicId);
        }
        req.body.drinkImg = req.file.path || req.file.secure_url || req.file.location || '';
        req.body.imagePublicId = req.file.filename || req.file.public_id || '';
      } else {
        req.body.drinkImg = oldNonAlcoholic.drinkImg;
        req.body.imagePublicId = oldNonAlcoholic.imagePublicId;
      }

      const result = await NonAlcoholicDrinkService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const nonAlcoholic = await NonAlcoholicDrinkService.getById(req.params.id);

      if (!nonAlcoholic) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
      if (nonAlcoholic.imagePublicId) {
        await cloudinary.uploader.destroy(nonAlcoholic.imagePublicId);
      }

      const result = await NonAlcoholicDrinkService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = NonAlcoholicDrinkController;
