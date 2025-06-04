const menuService = require("../services/menuService");

const menuController = {
    async addItemToMenu(req, res) {
        try {
            const newItem = {
                ownerId: req.ownerId,
                itemType: req.body.itemType,
                itemId: Number(req.params.itemId)
            };

            const result = await menuService.addItemToMenu(newItem.ownerId, newItem.itemType, newItem.itemId);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getById(req, res) {
        try {
            const item = await menuService.getById(Number(req.params.menuId));
            return res.status(200).json(item);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },
    async getDetailsItemById(req, res) {
        try {
            const item = await menuService.getDetailsItemById(Number(req.params.itemId));
            return res.status(200).json(item);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },
    async getAll(req, res) {
        try {
            const allItems = await menuService.getAll();
            return res.status(200).json(allItems);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getFullMenu(req, res) {
        try {
            console.log("Entrou no getFullMenu");
            console.log("OwnerId no controller:", req.ownerId);
            const menu = await menuService.getFullMenu(req.ownerId);
            return res.status(200).json(menu);
        } catch (error) {
            console.error("Erro getFullMenu:", error);
            return res.status(400).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const newData = {
                ownerId: req.ownerId,
                ...req.body,
                itemId: Number(req.params.itemId)
            };
            const result = await menuService.update(Number(req.params.menuId), newData);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async removeItemFromMenu(req, res) {
        try {
            const result = await menuService.removeItemFromMenu(Number(req.params.menuId));
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
};

module.exports = menuController;