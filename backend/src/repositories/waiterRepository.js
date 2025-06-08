const db = require("../config/dbConnection");
const Waiter = require("../models/Waiter");

const waiterRepository = {
    async findById(waiterId) {
        const [results] = await db.execute(
            `SELECT * FROM waiters WHERE id = ?`,
            [waiterId]
        );
        return results.length ? new Waiter(results[0]) : null;
    },

    async findByEmail(waiterEmail) {
        const [results] = await db.execute(
            `SELECT * FROM waiters WHERE email = ?`,
            [waiterEmail]
        );
        return results.length ? new Waiter(results[0]) : null;
    },

    async updateOthersFields(waiterId, newData) {
        const sql = `
            UPDATE waiters
            SET email = ?, cpf = ?, fullName = ?, birthdate = ?, phoneNumber = ?
            WHERE id = ?
        `;
        const params = [
            newData.email,
            newData.cpf,
            newData.fullName,
            newData.birthdate,
            newData.phoneNumber,
            waiterId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async updatePassword(waiterId, newPassword) {
        const [results] = await db.execute(
            `UPDATE waiters SET password = ? WHERE id = ?`,
            [newPassword, waiterId]
        );
        return results;
    }
};

module.exports = waiterRepository;