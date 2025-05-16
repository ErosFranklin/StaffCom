const db = require("../config/dbConnection");
const Manager = require("../models/Manager");

const managerRepository = {
    async findById(id){
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM managers WHERE id = ?`,
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length ? new Manager(results[0]) : null);
                    }
                }
            );            
        });
    },

    async findByEmail(email){
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM managers WHERE email = ?`,
                [email],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length ? new Manager(results[0]) : null);
                    }
                }
            );
        });
    },

    async updateOthersFields(id, data){
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE managers SET email = ?, cpf = ?, fullName = ?, birthdate = ?, phoneNumber = ?, department = ? WHERE id = ?`,
                [
                    data.email,
                    data.cpf,
                    data.fullName,
                    data.birthdate,
                    data.phoneNumber,
                    data.department,
                    id
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    },

    async updatePassword(id, newPassword){
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE managers SET password = ? WHERE id = ?`,
                [
                    newPassword,
                    id
                ],
                (err, results) => err ? reject(err) : resolve(results)
            );
        });
    }
};

module.exports = managerRepository;