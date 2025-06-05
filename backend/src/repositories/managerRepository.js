const db = require("../config/dbConnection");
const Manager = require("../models/Manager");
const Waiter = require("../models/Waiter");
const Cook = require("../models/Cook");

const managerRepository = {
    async findById(managerId) {
        const [results] = await db.execute(`SELECT * FROM managers WHERE id = ?`, [managerId]);
        return results.length ? new Manager(results[0]) : null;
    },

    async findByEmail(managerEmail) {
        const [results] = await db.execute(`SELECT * FROM managers WHERE email = ?`, [managerEmail]);
        return results.length ? new Manager(results[0]) : null;
    },

    async findAll() {
        const [results] = await db.execute(`SELECT * FROM managers`);
        return results.map(row => new Manager(row));
    },

    async updateOthersFields(managerId, newData) {
        const sql = `
            UPDATE managers 
            SET email = ?, cpf = ?, fullName = ?, birthdate = ?, phoneNumber = ?, department = ?
            WHERE id = ?
        `;
        const params = [
            newData.email,
            newData.cpf,
            newData.fullName,
            newData.birthdate,
            newData.phoneNumber,
            newData.department,
            managerId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async updatePassword(managerId, newPassword) {
        const [results] = await db.execute(
            `UPDATE managers SET password = ? WHERE id = ?`,
            [newPassword, managerId]
        );
        return results;
    },

    // functions involving waiters
    async createWaiter(waiterData) {
        const waiter = new Waiter(waiterData);
        const sql = `
            INSERT INTO waiters (fullName, birthdate, cpf, phoneNumber, email, password, managerId)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            waiter.fullName,
            waiter.birthdate,
            waiter.cpf,
            waiter.phoneNumber,
            waiter.email,
            waiter.password,
            waiter.managerId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async getWaiterByEmail(waiterEmail) {
        const [results] = await db.execute(
            `SELECT * FROM waiters WHERE email = ?`,
            [waiterEmail]
        );

        return results.length ? new Waiter(results[0]) : null;
    },

    async getAllWaiters(managerId) {
        const [results] = await db.execute(
            `SELECT * FROM waiters WHERE managerId = ?`,
            [managerId]
        );
        return results.map(row => new Waiter(row));
    },

    async activateWaiter(waiterId) {
        const [results] = await db.execute(
            `UPDATE waiters SET isActivated = TRUE WHERE id = ?`,
            [waiterId]
        );
        return results;
    },

    async deactivateWaiter(waiterId) {
        const [results] = await db.execute(
            `UPDATE waiters SET isActivated = FALSE WHERE id = ?`,
            [waiterId]
        );
        return results;
    },

    // functions involving cooks
    async createCook(cookData) {
        const cook = new Cook(cookData);
        const sql = `
            INSERT INTO cooks (fullName, birthdate, cpf, phoneNumber, email, password, managerId, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            cook.fullName,
            cook.birthdate,
            cook.cpf,
            cook.phoneNumber,
            cook.email,
            cook.password,
            cook.managerId,
            cook.role
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async getCookByEmail(cookEmail) {
        const [results] = await db.execute(
            `SELECT * FROM cooks WHERE email = ?`,
            [cookEmail]
        );

        return results.length ? new Cook(results[0]) : null;
    },

    async getChefByManagerId(managerId) {
        const [results] = await db.execute(
            `SELECT * FROM cooks WHERE managerId = ? AND role = 'chef'`,
            [managerId]
        );
        return results.length ? new Cook(results[0]) : null;
    },

    async getAllCooks(managerId) {
        const [results] = await db.execute(
            `SELECT * FROM cooks WHERE managerId = ?`,
            [managerId]
        );
        return results.map(row => new Cook(row));
    },

    async activateCook(cookId) {
        const [results] = await db.execute(
            `UPDATE cooks SET isActivated = TRUE WHERE id = ?`,
            [cookId]
        );
        return results;
    },

    async deactivateCook(cookId) {
        const [results] = await db.execute(
            `UPDATE cooks SET isActivated = FALSE WHERE id = ?`,
            [cookId]
        );
        return results;
    },

    async switchCookRoles(managerId, newChefId) {
        const [currentChefResult] = await db.execute(
            `SELECT * FROM cooks WHERE managerId = ? AND role = 'chef'`,
            [managerId]
        );

        if (currentChefResult.length > 0) {
            const currentChefId = currentChefResult[0].id;
            await db.execute(
                `UPDATE cooks SET role = 'assistant' WHERE id = ?`,
                [currentChefId]
            );
        }

        const [updateResult] = await db.execute(
            `UPDATE cooks SET role = 'chef' WHERE id = ? AND managerId = ?`,
            [newChefId, managerId]
        );

        return updateResult;
    }
};

module.exports = managerRepository;