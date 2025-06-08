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
            const owner = await ownerService.getById(req.ownerId); // only need to pass the token
            return res.status(200).json(owner);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    async getById(req, res) {
        try {
            const owner = await ownerService.getById(req.params.ownerId);
            delete owner.cnpj;
            return res.status(200).json(owner);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const owners = await ownerService.getAll();
            const ownersWithoutCnpj = owners.map(owner => {
                const { cnpj, ...rest } = owner;
                return rest;
            });
            return res.status(200).json(ownersWithoutCnpj);
        } catch (error) {
            return res.status(400).json({ message: error.message });
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

    async reactivateAccount(req, res) {
        try {
            const { email } = req.body;

            if (!email) return res.status(400).json({ message: "O email é obrigatório para reativação da conta!" });

            const result = await ownerService.reactivateAccount(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async excludeAccount(req, res) {
        try {
            const result = await ownerService.excludeAccount(req.ownerId); // only need to pass the token
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // manager's functions in owner
    async addManager(req, res) {
        try {
            const result = await ownerService.addManager(req.ownerId, req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async showAllManagers(req, res) {
        try {
            const managers = await ownerService.showAllManagers(req.ownerId);
            return res.status(200).json(managers);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async excludeManager(req, res) {
        const managerId = req.params.id;

        try {
            const result = await ownerService.excludeManager(managerId);

            if (!result) {
                return res.status(404).json({ message: "Manager não encontrado" });
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async reactivateManager(req, res) {
        try {
            const { email } = req.body;
            if (!email) return res.status(400).json({ message: "O email é obrigatório para reativação da conta!" });

            const result = await ownerService.reactivateManager(req.ownerId, email);

            if (!result) {
                return res.status(404).json({ message: "Manager não encontrado!" });
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = ownerController;