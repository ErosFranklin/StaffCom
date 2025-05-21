const db = require("../config/dbConnection");
const NonAlcoholicDrink = require("../models/NonAlcoholicDrink");

const nonAlcoholicDrinkRepository = {
    async findByDrinkId(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM non_alcoholic_drinks WHERE id = ?`, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? new NonAlcoholicDrink(results[0]) : null);
            });
        });
    },

    async create(data) {
        return new Promise((resolve, reject) => {
            const { id, packagingType } = data;
            db.query(
                `INSERT INTO non_alcoholic_drinks (id, packagingType) VALUES (?, ?)`,
                [id, packagingType],
                (err, result) => err ? reject(err) : resolve({ id: result.insertId, ...data })
            );
        });
    },

    async update(id, data) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE non_alcoholic_drinks SET packagingType = ? WHERE id = ?`,
                [data.packagingType, id],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM non_alcoholic_drinks WHERE id = ?`, [id], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }
};

module.exports = nonAlcoholicDrinkRepository;
