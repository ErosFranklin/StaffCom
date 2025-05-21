const DrinkService = require('../services/drinkService.js');
const cloudinary = require('../config/cloudinaryConnection.js');

const DrinkController = {
    async create(req, res) {
        try {
            if (!req.file) throw new Error('Imagem é obrigatória');
            const newDrink = await DrinkService.create({
                ...req.body,
                drinkImg: req.file.path || req.file.secure_url || req.file.location,
                imagePublicId: req.file.filename || req.file.public_id
            });
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
            if (req.file) {
                const oldDrink = await DrinkService.getById(req.params.id);
                if (oldDrink.imagePublicId) {
                    await cloudinary.uploader.destroy(oldDrink.imagePublicId);
                }
                req.body.drinkImg = req.file.path || req.file.secure_url || req.file.location || ''; 
                req.body.imagePublicId = req.file.filename || req.file.public_id || '';
            }
            const updated = await DrinkService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    async delete(req, res) {
        try {
            const drink = await DrinkService.getById(req.params.id);
            if (drink.imagePublicId) {
                await cloudinary.uploader.destroy(drink.imagePublicId);
            }
            await DrinkService.delete(req.params.id);
            res.json({ message: 'Bebida removida com sucesso.' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = DrinkController;