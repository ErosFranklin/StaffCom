const db = require("../config/dbConnection");
const Owner = require("../models/Owner");
const Manager = require("../models/Manager");

const ownerRepositories = {
    async create(ownerData) {
        const owner = new Owner(ownerData);
        const sql = `
            INSERT INTO owners (fullName, restaurantName, cnpj, email, password, phoneNumber)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            owner.fullName,
            owner.restaurantName,
            owner.cnpj,
            owner.email,
            owner.password,
            owner.phoneNumber
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async findById(ownerId) {
        const [results] = await db.execute(`SELECT * FROM owners WHERE id = ?`, [ownerId]);
        return results.length ? new Owner(results[0]) : null;
    },

    async findByEmail(ownerEmail) {
        const [results] = await db.execute(`SELECT * FROM owners WHERE email = ?`, [ownerEmail]);
        return results.length ? new Owner(results[0]) : null;
    },

    async findAll() {
        const [results] = await db.execute(`SELECT * FROM owners`);
        return results.map(row => new Owner(row));
    },

    async updateOthersFields(ownerId, ownerData) {
        const sql = `
            UPDATE owners 
            SET fullName = ?, restaurantName = ?, cnpj = ?, email = ?, phoneNumber = ?
            WHERE id = ?
        `;
        const params = [
            ownerData.fullName,
            ownerData.restaurantName,
            ownerData.cnpj,
            ownerData.email,
            ownerData.phoneNumber,
            ownerId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async updatePassword(ownerId, newPassword) {
        const [results] = await db.execute(
            `UPDATE owners SET password = ? WHERE id = ?`,
            [newPassword, ownerId]
        );
        return results;
    },

    async activate(ownerId) {
        const [results] = await db.execute(
            `UPDATE owners SET isActivated = TRUE WHERE id = ?`,
            [ownerId]
        );
        return results;
    },

    async deactivate(ownerId) {
        const [results] = await db.execute(
            `UPDATE owners SET isActivated = FALSE WHERE id = ?`,
            [ownerId]
        );
        return results;
    },

    // manager functions in owner 
    async createManager(managerData) {
        const manager = new Manager(managerData);
        const sql = `
            INSERT INTO managers (fullName, birthdate, cpf, phoneNumber, department, email, password, ownerId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            manager.fullName,
            manager.birthdate,
            manager.cpf,
            manager.phoneNumber,
            manager.department,
            manager.email,
            manager.password,
            manager.ownerId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async getManagerByEmail(managerEmail) {
        const [results] = await db.execute(
            `SELECT * FROM managers WHERE email = ?`,
            [managerEmail]
        );
        return results.length ? new Manager(results[0]) : null;
    },

    async getAllManagers(ownerId) {
        const [results] = await db.execute(
            `SELECT * FROM managers WHERE ownerId = ?`,
            [ownerId]
        );
        return results;
    },

    async activateManager(managerId) {
        const [results] = await db.execute(
            `UPDATE managers SET isActivated = TRUE WHERE id = ?`,
            [managerId]
        );
        return results;
    },

    async deactivateManager(managerId) {
        const [results] = await db.execute(
            `UPDATE managers SET isActivated = FALSE WHERE id = ?`,
            [managerId]
        );
        return results;
    }
};

module.exports = ownerRepositories;