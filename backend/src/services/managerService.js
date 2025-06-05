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

    async getById(managerId) {
        const manager = await managerRepository.findById(managerId);
        if (!manager) throw new Error("Gerente não encontrado!");
        delete manager.password;
        return manager;
    },

    async getAll(){
        const managers = await managerRepository.findAll();

        const protectedManagers = managers.map(manager => {
            const { password, ...rest } = manager;
            return rest;
        });

        return protectedManagers;
    },

    async updateOthersFields(managerId, managerData) {
        await managerRepository.updateOthersFields(managerId, managerData);
        return { message: "Gerente atualizado com sucesso!" };
    },

    async updatePassword(managerId, newPassword) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await managerRepository.updatePassword(managerId, hashedNewPassword);
        return { message: "Senha atualizada com sucesso!" };
    },

    // waiter's functions in manager
    async addWaiter(managerId, waiterData) {
        if (!waiterData.email) throw new Error("O email do novo garçom é obrigatório!");
        if (!waiterData.cpf) throw new Error("O CPF do novo garçom é obrigatório!");

        const cpfNumbersOnly = waiterData.cpf.replace(/[^\d]/g, '');

        const hashedPassword = await bcrypt.hash(cpfNumbersOnly, 10);

        const waiterToCreate = {
            ...waiterData,
            password: hashedPassword,
            managerId
        };

        const creationResult = await managerRepository.createWaiter(waiterToCreate);
        const waiterId = creationResult.insertId;

        const allWaiters = await managerRepository.getAllWaiters(managerId);
        const newWaiter = allWaiters.find(w => w.id === waiterId);

        if (!newWaiter) throw new Error("Erro ao recuperar o garçom criado!");

        const { password, ...newWaiterWithoutPassword } = newWaiter;

        return {
            message: "Garçom cadastrado e associado com sucesso!",
            waiter: newWaiterWithoutPassword
        };
    },

    async showAllWaiters(managerId) {
        const waiters = await managerRepository.getAllWaiters(managerId);

        const protectedWaiters = waiters.map(waiter => {
            const { password, ...rest } = waiter;
            return rest;
        });

        return protectedWaiters;
    },

    async excludeWaiter(waiterId) {
        await managerRepository.deactivateWaiter(waiterId);
        return { message: "Garçom excluído com sucesso!" };
    },

    async reactivateWaiter(managerId, waiterEmail) {
        const waiter = await managerRepository.getWaiterByEmail(waiterEmail);

        if (!waiter) throw new Error("Garçom não encontrado com esse email!");
        if (waiter.managerId !== managerId) throw new Error("Permissão negada: garçom não pertencia a este gerente!");

        await managerRepository.activateWaiter(waiter.id);
        return { message: "Conta de garçom reativada com sucesso!" };
    },

    // cooks's functions in manager
    async addCook(managerId, cookData) {
        if (!cookData.email) throw new Error("O email do novo cozinheiro é obrigatório!");
        if (!cookData.cpf) throw new Error("O CPF do novo cozinheiro é obrigatório!");
        if (!cookData.role) throw new Error("A função do novo cozinheiro é obrigatória!");

        const cpfNumbersOnly = cookData.cpf.replace(/[^\d]/g, '');

        const hashedPassword = await bcrypt.hash(cpfNumbersOnly, 10);

        if (cookData.role.toLowerCase() === 'chef') {
            const existingChef = await managerRepository.getChefByManagerId(managerId);
            if (existingChef) {
                throw new Error("Já existe um cozinheiro com a função de chef para este gerente!");
            }
        }

        const cookToCreate = {
            ...cookData,
            password: hashedPassword,
            managerId
        };

        const creationResult = await managerRepository.createCook(cookToCreate);
        const cookId = creationResult.insertId;

        const allCooks = await managerRepository.getAllCooks(managerId);
        const newCook = allCooks.find(c => c.id === cookId);

        if (!newCook) throw new Error("Erro ao recuperar o cozinheiro criado!");

        const { password, ...newCookWithoutPassword } = newCook;

        return {
            message: "Cozinheiro criado e associado com sucesso!",
            cook: newCookWithoutPassword
        };
    },

    async showAllCooks(managerId) {
        const cooks = await managerRepository.getAllCooks(managerId);

        const protectedCooks = cooks.map(cook => {
            const { password, ...rest } = cook;
            return rest;
        });

        return protectedCooks;
    },

    async excludeCook(cookId) {
        await managerRepository.deactivateCook(cookId);
        return { message: "Cozinheiro excluído com sucesso!" };
    },

    async reactivateCook(managerId, cookEmail) {
        const cook = await managerRepository.getCookByEmail(cookEmail);

        if (!cook) throw new Error("Cozinheiro não encontrado com esse email!");
        if (cook.managerId !== managerId) throw new Error("Permissão negada: cozinheiro não pertencia a este gerente!");

        await managerRepository.activateCook(cook.id);
        return { message: "Conta de cozinheiro reativada com sucesso!" };
    },

    async switchCookRoles(managerId, newChefId) {
        if (!managerId || !newChefId) {
            throw new Error('ID do gerente e ID do novo chef são obrigatórios!');
        }

        const result = await managerRepository.switchCookRoles(managerId, newChefId);

        if (result.affectedRows === 0) {
            throw new Error('Falha ao atualizar o cargo do novo chef. Verifique se o ID é válido e se pertence ao gerente.');
        }

        return { message: 'Cargo de chef atualizado com sucesso!' };
    }
};

module.exports = managerService;