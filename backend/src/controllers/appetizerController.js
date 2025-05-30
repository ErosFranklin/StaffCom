const appetizerService = require("../services/appetizerService");
const cloudinary = require("../config/cloudinaryConnection");

const appetizerController = {
  async create(req, res) {
    try {
      const file = req.file || {};
      const newAppetizer = {
        ...req.body,
        foodImg: file.path || file.secure_url || file.location || '',
        imagePublicId: file.filename || file.public_id || ''
      };
      const result = await appetizerService.create(newAppetizer);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const appetizers = await appetizerService.getAll();
      return res.status(200).json(appetizers);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const appetizer = await appetizerService.getById(req.params.id);
      return res.status(200).json(appetizer);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const oldAppetizer = await appetizerService.getById(req.params.id);
      if (!oldAppetizer) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      if (req.file) {
        if (oldAppetizer.imagePublicId) {
          await cloudinary.uploader.destroy(oldAppetizer.imagePublicId);
        }
        req.body.foodImg = req.file.path || req.file.secure_url || req.file.location || '';
        req.body.imagePublicId = req.file.filename || req.file.public_id || '';
      } else {
        req.body.foodImg = oldAppetizer.foodImg;
        req.body.imagePublicId = oldAppetizer.imagePublicId;
      }

      const result = await appetizerService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const appetizer = await appetizerService.getById(req.params.id);

      if (!appetizer) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
      if (appetizer.imagePublicId) {
        await cloudinary.uploader.destroy(appetizer.imagePublicId);
      }

      const result = await appetizerService.delete(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = appetizerController;