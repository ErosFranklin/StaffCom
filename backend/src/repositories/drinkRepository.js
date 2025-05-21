const db = require('../config/dbConnection');

class DrinkRepository {
    async create(drink) {
        const [result] = await db.query(
            `INSERT INTO drinks (drinkName, size, unitValue, drinkImg, quantity)
             VALUES (?, ?, ?, ?, ?)`,
            [drink.drinkName, drink.size, drink.unitValue, drink.drinkImg, drink.quantity]
        );
        return { id: result.insertId, ...drink };
    }

    async findAll() {
        const [rows] = await db.query('SELECT * FROM drinks');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM drinks WHERE id = ?', [id]);
        return rows[0];
    }

    async findByName(name) {
        const [rows] = await db.query('SELECT * FROM drinks WHERE drinkName = ?', [name]);
        return rows[0];
    }

    async update(id, drink) {
        await db.query(
            `UPDATE drinks SET drinkName = ?, size = ?, unitValue = ?, drinkImg = ?, quantity = ?
             WHERE id = ?`,
            [drink.drinkName, drink.size, drink.unitValue, drink.drinkImg, drink.quantity, id]
        );
    }

    async delete(id) {
        await db.query('DELETE FROM drinks WHERE id = ?', [id]);
    }
}

module.exports = new DrinkRepository();