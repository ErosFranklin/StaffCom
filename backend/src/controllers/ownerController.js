const ownerService = require("../services/ownerService");

const ownerController = {
    async signUp(req, res) {
        try {
            const result = await ownerService.signUp(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async signIn(req, res) {
        try {
            const result = await ownerService.signIn(req.body.email, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },

    async getProfile(req, res) {
        try {
            const owner = await ownerService.getProfile(req.ownerId); // only need to pass the token
            return res.status(200).json(owner);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async updateOtherFields(req, res) {
        try {
            const result = await ownerService.updateOthersFields(req.ownerId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updatePassword(req, res) {
        try {
            const result = await ownerService.updatePassword(req.ownerId, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async activate(req, res) {
        try {
            const result = await ownerService.activate(req.ownerId); // only need to pass the token
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async deactivate(req, res) {
        try {
            const result = await ownerService.deactivate(req.ownerId); // only need to pass the token
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = ownerController;