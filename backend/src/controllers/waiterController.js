const waiterService = require("../services/waiterService");

const waiterController = {
    async signIn(req, res) {
        try {
            const result = await waiterService.signIn(req.body.email, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },

    async getProfile(req, res) {
        try {
            const waiter = await waiterService.getProfile(req.waiterId);
            return res.status(200).json(waiter);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async updateOthersFields(req, res) {
        try {
            const result = await waiterService.updateOthersFields(req.waiterId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updatePassword(req, res) {
        try {
            const result = await waiterService.updatePassword(req.waiterId, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
};

module.exports = waiterController;