const cookRepository = require("../repositories/cookRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const cookService = {
    async signIn(email, password) {
        const cook = await cookRepository.findByEmail(email);

        if (!cook) throw new Error("Cozinheiro não encontrado!");
        if (cook.role !== 'chef') throw new Error("Apenas cozinheiros com função de chef podem acessar!");
        if (!cook.isActivated) throw new Error("Não é possível fazer login com uma conta excluída. Tente reativá-la!");

        const validPassword = await bcrypt.compare(password, cook.password);
        if (!validPassword) throw new Error("Credenciais inválidas!");

        const payload = {
            userType: "cook",
            cookId: cook.id,
            cookRole: cook.role
        };

        const tokenTime = { expiresIn: "1h" };

        const token = jwt.sign(payload, secret, tokenTime);

        return { mesage: "Login realizado com sucesso!", token };
    },

    async getProfile(cookId) {
        const cook = await cookRepository.findById(cookId);
        if (!cook) throw new Error("Cozinheiro não encontrado!");
        delete cook.password;
        return cook;
    },

    async updateOthersFields(cookId, cookData) {
        await cookRepository.updateOthersFields(cookId, cookData);
        return { message: "Cozinheiro atualizado com sucesso!" };
    },

    async updatePassword(cookId, newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await cookRepository.updatePassword(cookId, hashedNewPassword);
        return { message: "Senha atualizada com sucesso!" };
    }
};

module.exports = cookService;