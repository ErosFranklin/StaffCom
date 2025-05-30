const db = require("../config/dbConnection");
const NonAlcoholicDrink = require('../models/NonAlcoholicDrink');

class NonAlcoholicDrinkRepository {
  async create(data) {
    const { drinkName, size, unitValue, drinkImg, imagePublicId, quantity, packagingType } = data;
    const [result] = await db.query(
      `INSERT INTO non_alcoholic_drinks 
       (drinkName, size, unitValue, drinkImg, imagePublicId, quantity, packagingType)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [drinkName, size, unitValue, drinkImg, imagePublicId, quantity, packagingType]
    );
    return new NonAlcoholicDrink({ id: result.insertId, ...data });
  }

  async findAll() {
    const [rows] = await db.query('SELECT * FROM non_alcoholic_drinks');
    return rows.map(row => new NonAlcoholicDrink(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM non_alcoholic_drinks WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new NonAlcoholicDrink(rows[0]);
  }

  async update(id, data) {
    const { drinkName, size, unitValue, drinkImg, imagePublicId, quantity, packagingType } = data;
    await db.query(
      `UPDATE non_alcoholic_drinks 
       SET drinkName = ?, size = ?, unitValue = ?, drinkImg = ?, imagePublicId = ?, quantity = ?, packagingType = ? 
       WHERE id = ?`,
      [drinkName, size, unitValue, drinkImg, imagePublicId, quantity, packagingType, id]
    );
    return new NonAlcoholicDrink({ id, ...data });
  }

  async delete(id) {
    await db.query('DELETE FROM non_alcoholic_drinks WHERE id = ?', [id]);
  }
}

module.exports = new NonAlcoholicDrinkRepository();
