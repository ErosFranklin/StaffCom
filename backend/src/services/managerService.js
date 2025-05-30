const managerRepository = require("../repositories/managerRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const managerService = {
    async signIn(email, password) {
        const manager = await managerRepository.findByEmail(email);

        if (!manager) throw new Error("Gerente não cadastrado!"); // In Portuguese because of the alerts
        if (!manager.isActivated) throw new Error("Não é possível fazer login com uma conta excluída. Tente reativá-la!");

        const validPassword = await bcrypt.compare(password, manager.password);
        if (!validPassword) throw new Error("Credenciais inválidas!");

        const payload = {
            userType: "manager",
            managerId: manager.id
        };

        const tokenTime = { expiresIn: "1h" };

        const token = jwt.sign(payload, secret, tokenTime);

        return { message: "Login realizado com sucesso!", token };
    },

    async getProfile(managerId) {
        const manager = await managerRepository.findById(managerId);
        if (!manager) throw new Error("Gerente não encontrado!");
        delete manager.password;
        return manager;
    },

    async updateOthersFields(managerId, managerData) {
        await managerRepository.updateOthersFields(managerId, managerData);
        return { message: "Gerente atualizado com sucesso!" };
    },

    async updatePassword(managerId, newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await managerRepository.updatePassword(managerId, hashedNewPassword);
        return { message: "Senha atualizada com sucesso!" };
    }
};

module.exports = managerService;