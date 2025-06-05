const managerService = require("../services/managerService");

const managerController = {
    async signIn(req, res) {
        try {
            const result = await managerService.signIn(req.body.email, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },

    async getProfile(req, res) {
        try {
            const manager = await managerService.getProfile(req.managerId); // only need to pass the token
            return res.status(200).json(manager);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async updateOthersFields(req, res) {
        try {
            const result = await managerService.updateOthersFields(req.managerId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async updatePassword(req, res) {
        try {
            const result = await managerService.updatePassword(req.managerId, req.body.password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // waiter's functions in manager
    async addWaiter(req, res) {
        try {
            const result = await managerService.addWaiter(req.managerId, req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getAllWaitersByManagerId(req, res) {
        try {
            const waiters = await managerService.showAllWaiters(req.params.managerId);
            return res.status(200).json(waiters);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async showAllWaiters(req, res) {
        try {
            const waiters = await managerService.showAllWaiters(req.managerId);
            return res.status(200).json(waiters);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async excludeWaiter(req, res) {
        const waiterId = req.params.waiterId;

        try {
            const result = await managerService.excludeWaiter(waiterId);

            if (!result) return res.status(404).json({ message: "Garçom não encontrado!" });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async reactivateWaiter(req, res) {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ message: "O email é obrigatório para reativação da conta!" });

            const result = await managerService.reactivateWaiter(req.managerId, email);

            if (!result) return res.status(404).json({ message: "Garçom não encontrado!" });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // cook's functions in manager
    async addCook(req, res) {
        try {
            const result = await managerService.addCook(req.managerId, req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getAllCooksByManagerId(req, res) {
        try {
            const cooks = await managerService.showAllCooks(req.params.managerId);
            return res.status(200).json(cooks);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async showAllCooks(req, res) {
        try {
            const cooks = await managerService.showAllCooks(req.managerId);
            return res.status(200).json(cooks);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async excludeCook(req, res) {
        const cookId = req.params.cookId;

        try {
            const result = await managerService.excludeCook(cookId);

            if (!result) return res.status(404).json({ message: "Cozinheiro não encontrado!" });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async reactivateCook(req, res) {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ message: "O email é obrigatório para reativação da conta!" });

            const result = await managerService.reactivateCook(req.managerId, email);

            if (!result) return res.status(404).json({ message: "Cozinheiro não encontrado!" });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async switchCookRoles(req, res) {
        try {
            const managerId = req.managerId;
            const { newChefId } = req.params.newChefId;

            const result = await managerService.switchCookRoles(managerId, newChefId);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = managerController;