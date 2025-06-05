const db = require("../config/dbConnection");
const Menu = require("../models/Menu");

const menuRepository = {
    async create(ownerId, itemType, itemId) {
        const sql = `INSERT INTO menu(ownerId, itemType, itemId) VALUES (?, ?, ?)`;
        const params = [
            ownerId,
            itemType,
            itemId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async findDetailsItemById(menuId) {
        const [rows] = await db.execute(
            `SELECT 
                m.id AS menuId,
                m.ownerId,
                m.itemType,
                m.itemId,

                -- Recipe
                r.id AS recipeId,
                r.foodName AS recipeName,
                r.foodDescription AS recipeDescription,
                r.value AS recipeValue,
                r.foodImg AS recipeImg,
                r.imagePublicId AS recipeImgPublicId,

                -- Appetizer
                a.id AS appetizerId,
                a.foodName AS appetizerName,
                a.foodDescription AS appetizerDescription,
                a.value AS appetizerValue,
                a.foodImg AS appetizerImg,
                a.imagePublicId AS appetizerImgPublicId,
                a.size AS appetizerSize,

                -- Alcoholic Drink
                ad.id AS alcoholicId,
                ad.drinkName AS alcoholicName,
                ad.size AS alcoholicSize,
                ad.unitValue AS alcoholicValue,
                ad.drinkImg AS alcoholicImg,
                ad.imagePublicId AS alcoholicImgPublicId,
                ad.quantity AS alcoholicQuantity,
                ad.drinkType AS alcoholicDrinkType,

                -- Non Alcoholic Drink
                nad.id AS nonAlcoholicId,
                nad.drinkName AS nonAlcoholicName,
                nad.size AS nonAlcoholicSize,
                nad.unitValue AS nonAlcoholicValue,
                nad.drinkImg AS nonAlcoholicImg,
                nad.imagePublicId AS nonAlcoholicImgPublicId,
                nad.quantity AS nonAlcoholicQuantity,
                nad.packagingType AS nonAlcoholicPackagingType

            FROM menu m
            LEFT JOIN recipes r ON m.itemType = 'receita' AND m.itemId = r.id
            LEFT JOIN appetizers a ON m.itemType = 'entrada' AND m.itemId = a.id
            LEFT JOIN alcoholic_drinks ad ON m.itemType = 'bebida_alcoolica' AND m.itemId = ad.id
            LEFT JOIN non_alcoholic_drinks nad ON m.itemType = 'bebida_nao_alcoolica' AND m.itemId = nad.id
            WHERE m.id = ?`,
            [menuId]
        );

        return rows[0];
    },
    
    async findById(id) {
        const [results] = await db.execute(`SELECT * FROM menu WHERE id = ?`, [id]);
        return results.length ? new Menu(results[0]) : null;
    },
    

    async findAll() {
        const [results] = await db.execute(`SELECT * FROM menu`);
        return results;
    },

    async findFullMenuByOwner(ownerId) {
        const [rows] = await db.execute(
            `SELECT 
                m.id AS menuId,
                m.ownerId,
                m.itemType,
                m.itemId,

                -- Recipe
                r.id AS recipeId,
                r.foodName AS recipeName,
                r.foodDescription AS recipeDescription,
                r.value AS recipeValue,
                r.foodImg AS recipeImg,
                r.imagePublicId AS recipeImgPublicId,

                -- Appetizer
                a.id AS appetizerId,
                a.foodName AS appetizerName,
                a.foodDescription AS appetizerDescription,
                a.value AS appetizerValue,
                a.foodImg AS appetizerImg,
                a.imagePublicId AS appetizerImgPublicId,
                a.size AS appetizerSize,

                -- Alcoholic Drink
                ad.id AS alcoholicId,
                ad.drinkName AS alcoholicName,
                ad.size AS alcoholicSize,
                ad.unitValue AS alcoholicValue,
                ad.drinkImg AS alcoholicImg,
                ad.imagePublicId AS alcoholicImgPublicId,
                ad.quantity AS alcoholicQuantity,
                ad.drinkType AS alcoholicDrinkType,

                -- Non Alcoholic Drink
                nad.id AS nonAlcoholicId,
                nad.drinkName AS nonAlcoholicName,
                nad.size AS nonAlcoholicSize,
                nad.unitValue AS nonAlcoholicValue,
                nad.drinkImg AS nonAlcoholicImg,
                nad.imagePublicId AS nonAlcoholicImgPublicId,
                nad.quantity AS nonAlcoholicQuantity,
                nad.packagingType AS nonAlcoholicPackagingType

            FROM menu m
            LEFT JOIN recipes r ON m.itemType = 'receita' AND m.itemId = r.id
            LEFT JOIN appetizers a ON m.itemType = 'entrada' AND m.itemId = a.id
            LEFT JOIN alcoholic_drinks ad ON m.itemType = 'bebida_alcoolica' AND m.itemId = ad.id
            LEFT JOIN non_alcoholic_drinks nad ON m.itemType = 'bebida_nao_alcoolica' AND m.itemId = nad.id
            WHERE m.ownerId = ?`,
            [ownerId]
        );
        return rows;
    },

    async update(menuId, data) {
        const updatedItem = new Menu(data);
        const sql = `
            UPDATE menu 
            SET ownerId = ?, itemType = ?, itemId = ?
            WHERE id = ?
        `;
        const params = [
            updatedItem.ownerId,
            updatedItem.itemType,
            updatedItem.itemId,
            menuId
        ];
        const [results] = await db.execute(sql, params);
        return results;
    },

    async delete(menuId) {
        const [results] = await db.execute(`DELETE FROM menu WHERE id = ?`, [menuId]);
        return results;
    }
};

module.exports = menuRepository;