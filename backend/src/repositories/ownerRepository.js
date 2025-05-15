const db = require("../config/dbConnection");
const Owner = require("../models/Owner");

const ownerRepositories = {
    async create(data) {
        const owner = new Owner(data);

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

    async findById(id) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM owners WHERE id = ?`,
                [id],
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

    async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM owners WHERE email = ?`,
                [email],
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

    async updateOthersFields(id, data) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET fullName = ?, restaurantName = ?, cnpj = ?, email = ?, phoneNumber = ? WHERE id = ?`,
                [
                    data.fullName,
                    data.restaurantName,
                    data.cnpj,
                    data.email,
                    data.phoneNumber,
                    id
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async updatePassword(id, newPassword) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET password = ? WHERE id = ?`,
                [
                    newPassword,
                    id
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async activate(id) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET isActivated = TRUE WHERE id = ?`,
                [id],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    // soft delete
    async deactivate(id) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE owners SET isActivated = FALSE WHERE id = ?`,
                [id],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    }
};

module.exports = ownerRepositories;