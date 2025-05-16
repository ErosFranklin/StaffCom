const db = require("../config/dbConnection");
const Owner = require("../models/Owner");
const Manager = require("../models/Manager");

const ownerRepositories = {
    async create(ownerData) {
        const owner = new Owner(ownerData);

        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO owners (fullName, restaurantName, cnpj, email, password, phoneNumber)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    owner.fullName,
                    owner.restaurantName,
                    owner.cnpj,
                    owner.email,
                    owner.password,
                    owner.phoneNumber
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async findById(ownerId) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM owners WHERE id = ?`,
                [ownerId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length ? new Owner(results[0]) : null);
                    }
                }
            );
        });
    },

    async findByEmail(ownerEmail) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM owners WHERE email = ?`,
                [ownerEmail],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length ? new Owner(results[0]) : null);
                    }
                }
            );
        });
    },

    async updateOthersFields(ownerId, ownerData) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET fullName = ?, restaurantName = ?, cnpj = ?, email = ?, phoneNumber = ? WHERE id = ?`,
                [
                    ownerData.fullName,
                    ownerData.restaurantName,
                    ownerData.cnpj,
                    ownerData.email,
                    ownerData.phoneNumber,
                    ownerId
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async updatePassword(ownerId, newPassword) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET password = ? WHERE id = ?`,
                [
                    newPassword,
                    ownerId
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async activate(ownerId) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET isActivated = TRUE WHERE id = ?`,
                [ownerId],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    // soft delete
    async deactivate(ownerId) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET isActivated = FALSE WHERE id = ?`,
                [ownerId],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    // manager's functions in owner
    async createManager(managerData){
        return new Promise((resolve, reject) => {
            const manager = new Manager(managerData);

            db.query(
                `INSERT INTO managers (fullName, birthdate, cpf, phoneNumber, department, email, password, ownerId)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    manager.fullName,
                    manager.birthdate,
                    manager.cpf,
                    manager.phoneNumber,
                    manager.department,
                    manager.email,
                    manager.password,
                    manager.ownerId
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async getManagerByEmail (managerEmail){
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM managers WHERE email = ?`,
                [managerEmail],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length ? new Manager(results[0]) : null)
                    }
                }
            );
        });
    },

    async getAllManagers(ownerId){
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM managers WHERE ownerId = ?`,
                [ownerId],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async activateManager(managerId){
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE managers SET isActivated = TRUE WHERE id = ?`,
                [managerId],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async deactivateManager(managerId){
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE managers SET isActivated = FALSE WHERE id = ?`,
                [managerId],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    }
};

module.exports = ownerRepositories;