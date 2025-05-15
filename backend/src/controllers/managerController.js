const managerService = require("../services/managerService");

const managerController = {
    async signIn(req, res){
        try {
            const result = await managerService.signIn(req.body.email, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },

    async getProfile(req, res){
        try {
            const manager = await managerService.getProfile(req.managerId); // only need to pass the token
            return res.status(200).json(manager);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async updateOthersFields(req, res){
        try {
            const result = await managerService.updateOthersFields(req.managerId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updatePassword(req, res){
        try {
            const result = await managerService.updatePassword(req.managerId, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
};

module.exports = managerController;