const db = require("../config/dbConnection");
const Cook = require("../models/Cook");

const cookRepository = {
    async findById(cookId){
        const [results] = await db.execute(
            `SELECT * FROM cooks WHERE id = ?`,
            [cookId]
        );
        return results.length ? new Cook(results[0]) : null;
    },

    async findByEmail(cookEmail){
        const [results] = await db.execute(
            `SELECT * FROM cooks WHERE email = ?`,
            [cookEmail]
        );
        return results.length ? new Cook(results[0]) : null;
    },

    async updateOthersFields(cookId, newData){
        const sql = `
            UPDATE cooks
            SET email = ?, cpf = ?, fullName = ?, birthdate = ?, phoneNumber = ?
            WHERE id = ?
        `;
        const params = [
            newData.email,
            newData.cpf,
            newData.fullName,
            newData.birthdate,
            newData.phoneNumber,
            cookId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async updatePassword(cookId, newPassword){
        const [results] = await db.execute(
            `UPDATE cooks SET password = ? WHERE id = ?`,
            [newPassword, cookId]
        );
        return results;
    }
};

module.exports = cookRepository;