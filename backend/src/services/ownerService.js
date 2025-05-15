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

    async signIn(ownerEmail, ownerPassword) {
        const owner = await ownerRepository.findByEmail(ownerEmail);

        if (!owner) throw new Error("Dono não cadastrado!");
        if (!owner.isActivated) throw new Error("Não é possível fazer login com uma conta excluída. Tente reativá-la!");

        const validPassword = await bcrypt.compare(ownerPassword, owner.password);
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

    async reactivateAccount(ownerEmail) {
        const owner = await ownerRepository.findByEmail(ownerEmail);

        if (!owner) throw new Error("Dono não encontrado com esse email!");

        await ownerRepository.activate(owner.id);
        
        return { message: "Conta reativada com sucesso!" };
    },

    async excludeAccount(ownerId) {
        await ownerRepository.deactivate(ownerId);
        return { message: "Dono excluído com sucesso!" };
    },

    // manager's functions in owner
    async addManager(ownerId, managerData){
        // only what is can not null
        if (!managerData.email){
            throw new Error("O email do novo gerente é obrigatório!");
        }
        if (!managerData.cpf){
            throw new Error("O CPF do novo gerente é obrigatório!");
        }

        const cpfNumbersOnly = managerData.cpf.replace(/[^\d]/g, ''); // get only the numbers of CPF

        const hashedPassword = await bcrypt.hash(cpfNumbersOnly, 10);

        const managerToCreate = {
            ...managerData,
            password: hashedPassword,
            ownerId
        };

        const creationResult = await ownerRepository.createManager(managerToCreate);
        const managerId = creationResult.insertId;

        const allManagers =  await ownerRepository.getAllManagers(ownerId);
        const newManager = allManagers.find(m => m.id === managerId);

        if (!newManager){
            throw new Error("Erro ao recuperar o gerente criado!");
        }

        // removing password before returning
        const { password, ...newManagerWithoutPassword } = newManager;

        return {
            message: "Gerente cadastrado e associado com sucesso!",
            manager: newManagerWithoutPassword
        }
    },

    async showAllManagers(ownerId){
        const managers = await ownerRepository.getAllManagers(ownerId);

        // command to filter managers without their passwords
        const protectedManagers = managers.map(manager => {
            const { password, ...rest } = manager;
            return rest;
        });

        return protectedManagers;
    },

    async excludeManager(managerId){
        await ownerRepository.deactivateManager(managerId);
        return { message: "Gerente excluído com sucesso!" };
    },

    async reactivateManager(ownerId, managerEmail){
        const manager = await ownerRepository.getManagerByEmail(managerEmail);

        if(!manager) throw new Error("Gerente não encontrado com esse email!");
        if(manager.ownerId !== ownerId) throw new Error("Permissão negada: gerente não pertencia a este dono!");

        await ownerRepository.activateManager(manager.id);
        return { message: "Conta de gerente reativada com sucesso!" };
    }
};

module.exports = ownerService;