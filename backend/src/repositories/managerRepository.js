const db = require("../config/dbConnection");
const Manager = require("../models/Manager");

const managerRepository = {
    async findById(id) {
        const [results] = await db.execute(`SELECT * FROM managers WHERE id = ?`, [id]);
        return results.length ? new Manager(results[0]) : null;
    },

    async findByEmail(email) {
        const [results] = await db.execute(`SELECT * FROM managers WHERE email = ?`, [email]);
        return results.length ? new Manager(results[0]) : null;
    },

    async updateOthersFields(id, data) {
        const sql = `
            UPDATE managers 
            SET email = ?, cpf = ?, fullName = ?, birthdate = ?, phoneNumber = ?, department = ?
            WHERE id = ?
        `;
        const params = [
            data.email,
            data.cpf,
            data.fullName,
            data.birthdate,
            data.phoneNumber,
            data.department,
            id
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async updatePassword(id, newPassword) {
        const [results] = await db.execute(
            `UPDATE managers SET password = ? WHERE id = ?`,
            [newPassword, id]
        );
        return results;
    }
};

module.exports = managerRepository;