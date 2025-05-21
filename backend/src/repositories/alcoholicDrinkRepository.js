const db = require("../config/dbConnection");
const AlcoholicDrink = require("../models/AlcoholicDrink");

const alcoholicDrinkRepository = {
    async findByDrinkId(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM alcoholic_drinks WHERE id = ?`, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? new AlcoholicDrink(results[0]) : null);
            });
        });
    },

    async create(data) {
        return new Promise((resolve, reject) => {
            const { id, drinkType } = data;
            db.query(
                `INSERT INTO alcoholic_drinks (id, drinkType) VALUES (?, ?)`,
                [id, drinkType],
                (err, result) => err ? reject(err) : resolve({ id: result.insertId, ...data })
            );
        });
    },

    async update(id, data) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE alcoholic_drinks SET drinkType = ? WHERE id = ?`,
                [data.drinkType,id],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM alcoholic_drinks WHERE id = ?`, [id], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }
};

module.exports = alcoholicDrinkRepository;
