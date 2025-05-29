const db = require("../config/dbConnection");
const AlcoholicDrink = require('../models/AlcoholicDrink');

class AlcoholicDrinkRepository {
  async create(data) {
    const { drinkName, size, unitValue, drinkImg, imagePublicId, quantity, drinkType } = data;
    const [result] = await db.query(
      `INSERT INTO alcoholic_drinks 
       (drinkName, size, unitValue, drinkImg, imagePublicId, quantity, drinkType)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [drinkName, size, unitValue, drinkImg, imagePublicId, quantity, drinkType]
    );
    return new AlcoholicDrink({ id: result.insertId, ...data });
  }

  async findAll() {
    const [rows] = await db.query('SELECT * FROM alcoholic_drinks');
    return rows.map(row => new AlcoholicDrink(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM alcoholic_drinks WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return new AlcoholicDrink(rows[0]);
  }

  async update(id, data) {
    const { drinkName, size, unitValue, drinkImg, imagePublicId, quantity, drinkType } = data;
    await db.query(
      `UPDATE alcoholic_drinks 
       SET drinkName = ?, size = ?, unitValue = ?, drinkImg = ?, imagePublicId = ?, quantity = ?, drinkType = ? 
       WHERE id = ?`,
      [drinkName, size, unitValue, drinkImg, imagePublicId, quantity, drinkType, id]
    );
    return new AlcoholicDrink({ id, ...data });
  }

  async delete(id) {
    await db.query('DELETE FROM alcoholic_drinks WHERE id = ?', [id]);
  }
}

module.exports = new AlcoholicDrinkRepository();