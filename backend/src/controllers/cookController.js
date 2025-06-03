const cookService = require("../services/cookService");

const cookController = {
    async signIn(req, res) {
        try {
            const result = await cookService.signIn(req.body.email, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },

    async getProfile(req, res) {
        try {
            const cook = await cookService.getProfile(req.cookId);
            return res.status(200).json(cook);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async updateOthersFields(req, res) {
        try {
            const result = await cookService.updateOthersFields(req.cookId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updatePassword(req, res) {
        try {
            const result = await cookService.updatePassword(req.cookId, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

module.exports = cookController;