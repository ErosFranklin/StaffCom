const waiterRepository = require("../repositories/waiterRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const waiterService = {
    async signIn(email, password) {
        const waiter = await waiterRepository.findByEmail(email);

        if (!waiter) throw new Error("Garçom não encontrado!");
        if (!waiter.isActivated) throw new Error("Não é possível fazer login com uma conta excluída. Tente reativá-la!");

        const validPassword = await bcrypt.compare(password, waiter.password);
        if (!validPassword) throw new Error("Credencias inválidas!");

        const payload = {
            userType: "waiter",
            waiterId: waiter.id
        };

        const tokenTime = { expiresIn: "1h" };

        const token = jwt.sign(payload, secret, tokenTime);

        return { message: "Login realizado com sucesso!", token };
    },

    async getProfile(waiterId) {
        const waiter = await waiterRepository.findById(waiterId);
        if (!waiter) throw new Error("Garçom não encontrado!");
        delete waiter.password;
        return waiter;
    },

    async updateOthersFields(waiterId, waiterData) {
        await waiterRepository.updateOthersFields(waiterId, waiterData);
        return { message: "Garçom atualizado com sucesso!" };
    },

    async updatePassword(waiterId, newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await waiterRepository.updatePassword(waiterId, hashedNewPassword);
        return { message: "Senha atualizada com sucesso!" };
    }
};

module.exports = waiterService;