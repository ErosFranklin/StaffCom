const db = require("../config/dbConnection");
const Recipe = require("../models/Recipes");

const recipesRepository = {
    async findById(id) {
        const [results] = await db.execute(`SELECT * FROM recipes WHERE id = ?`, [id]);
        return results.length ? new Recipe(results[0]) : null;
    },

    async findAll() {
        const [results] = await db.execute(`SELECT * FROM recipes`);
        return results;
    },

    async create(data) {
        const { foodName, foodDescription, value, foodImg, imagePublicId } = data;
        const sql = `INSERT INTO recipes (foodName, foodDescription, value, foodImg, imagePublicId) VALUES (?, ?, ?, ?, ?)`;
        const params = [foodName, foodDescription, value, foodImg, imagePublicId];
        const [result] = await db.execute(sql, params);
        return result;
    },

    async update(id, data) {
        const { foodName, foodDescription, value, foodImg, imagePublicId } = data;
        const sql = `
            UPDATE recipes 
            SET foodName = ?, foodDescription = ?, value = ?, foodImg = ?, imagePublicId = ?
            WHERE id = ?
        `;
        const params = [foodName, foodDescription, value, foodImg, imagePublicId, id];
        const [result] = await db.execute(sql, params);
        return result;
    },

    async delete(id) {
        const [result] = await db.execute(`DELETE FROM recipes WHERE id = ?`, [id]);
        return result;
    }
};

module.exports = recipesRepository;