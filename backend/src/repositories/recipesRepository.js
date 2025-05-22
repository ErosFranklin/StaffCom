const db = require("../config/dbConnection");
const Recipe = require("../models/Recipes");

const recipesRepository = {
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM recipes WHERE id = ?`, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.length ? new Recipe(results[0]) : null);
            });
        });
    },

    async create(data) {
        return new Promise((resolve, reject) => {
            const { nameFood, foodDescripcion, value, foodImg } = data;
            db.query(
                `INSERT INTO recipes (nameFood, foodDescripcion, value, foodImg) VALUES (?, ?, ?, ?)`,
                [nameFood, foodDescripcion, value, foodImg],
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...data });
                }
            );
        });
    },

    async update(id, data) {
        return new Promise((resolve, reject) => {
            const { nameFood, foodDescripcion, value, foodImg } = data;
            db.query(
                `UPDATE recipes SET nameFood = ?, foodDescripcion = ?, value = ?, foodImg = ? WHERE id = ?`,
                [nameFood, foodDescripcion, value, foodImg, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM recipes WHERE id = ?`, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
};

module.exports = recipesRepository;
