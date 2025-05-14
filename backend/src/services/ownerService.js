const ownerRepository = require("../repositories/ownerRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const ownerService = {
    async signUp(newOwner) {
        // only what is can not null
        if (!newOwner.email){
            throw new Error("O email do novo dono é obrigatório!");
        }
        if (!newOwner.password){
            throw new Error("A senha do novo dono é obrigatória!");
        }

        const existingOwner = await ownerRepository.findByEmail(newOwner.email);
        if (existingOwner) throw new Error("Email já cadastrado!"); // In Portuguese because of the alerts

        const hashedPassword = await bcrypt.hash(newOwner.password, 10);
        newOwner.password = hashedPassword;

        const result = await ownerRepository.create(newOwner);
        const createdOwner = await ownerRepository.findById(result.insertId);
        delete createdOwner.password;

        return {
            message: "Dono cadastrado com sucesso!",
            owner: createdOwner
        }
    },

    async signIn(email, password) {
        const owner = await ownerRepository.findByEmail(email);
        if (!owner) throw new Error("Dono não cadastrado!");

        const validPassword = await bcrypt.compare(password, owner.password);
        if (!validPassword) throw new Error("Credenciais inválidas!");

        const payload = {
            userType: "owner",
            ownerId: owner.id
        };

        const tokenTime = { expiresIn: "1h" };

        const token = jwt.sign(payload, secret, tokenTime);

        return { message: "Login realizado com sucesso!", token };
    },

    async getProfile(ownerId) {
        const owner = await ownerRepository.findById(ownerId);
        if (!owner) throw new Error("Dono não encontrado!");
        delete owner.password;
        return owner;
    },

    async updateOthersFields(ownerId, ownerData) {
        await ownerRepository.updateOthersFields(ownerId, ownerData);
        return { message: "Dono atualizado com sucesso!" };
    },

    async updatePassword(ownerId, newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await ownerRepository.updatePassword(ownerId, hashedNewPassword);
        return { message: "Senha atualizada com sucesso!" };
    },

    async activate(ownerId) {
        await ownerRepository.activate(ownerId);
        return { message: "Conta reativada com sucesso!" };
    },

    async deactivate(ownerId) {
        await ownerRepository.deactivate(ownerId);
        return { message: "Dono excluído com sucesso!" };
    }
};

module.exports = ownerService;