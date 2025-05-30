const db = require("../config/dbConnection");
const Appetizer = require("../models/Appetizer");

const appetizerRepository = {
    async create(data) {
        const appetizer = new Appetizer(data);
        const sql = `
            INSERT INTO appetizers (foodName, foodDescription, value, foodImg, imagePublicId, size)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            appetizer.foodName,
            appetizer.foodDescription,
            appetizer.value,
            appetizer.foodImg,
            appetizer.imagePublicId,
            appetizer.size
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async findAll() {
        const [results] = await db.execute(`SELECT * FROM appetizers`);
        return results;
    },

    async findById(id) {
        const [results] = await db.execute(`SELECT * FROM appetizers WHERE id = ?`, [id]);
        return results.length ? new Appetizer(results[0]) : null;
    },

    async update(id, data) {
        const newAppetizer = new Appetizer(data);
        const sql = `
            UPDATE appetizers 
            SET foodName = ?, foodDescription = ?, value = ?, foodImg = ?, imagePublicId = ?, size = ?
            WHERE id = ?
        `;
        const params = [
            newAppetizer.foodName,
            newAppetizer.foodDescription,
            newAppetizer.value,
            newAppetizer.foodImg,
            newAppetizer.imagePublicId,
            newAppetizer.size,
            id
        ];
        console.log('update params:', params);
        const [results] = await db.execute(sql, params);
        return results;
    },

    async delete(id) {
        const [results] = await db.execute(`DELETE FROM appetizers WHERE id = ?`, [id]);
        return results;
    }
};

module.exports = appetizerRepository;