const db = require("../config/dbConnection");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const orderRepository = {
    async createOrder(table, waiterId, chefId) {
        const [result] = await db.execute(
            `INSERT INTO orders (\`table\`, waiterId, chefId) VALUES (?, ?, ?)`,
            [table, waiterId, chefId]
        );
        return result;
    },

    async findById(id) {
        const [rows] = await db.execute(
            `SELECT * FROM orders WHERE id = ?`,
            [id]
        );
        return rows.length ? new Order(rows[0]) : null;
    },

    async findAll() {
        const [rows] = await db.execute(`SELECT * FROM orders`);
        return rows.map(row => new Order(row));
    },

    async findByWaiter(waiterId) {
        const [rows] = await db.execute(
            `SELECT * FROM orders WHERE waiterId = ?`,
            [waiterId]
        );
        return rows.map(row => new Order(row));
    },

    async findByChef(chefId) {
        const [rows] = await db.execute(
            `SELECT * FROM orders WHERE chefId = ?`,
            [chefId]
        );
        return rows.map(row => new Order(row));
    },

    async updateOrder(id, table) {
        const [result] = await db.execute(
            `UPDATE orders SET \`table\` = ? WHERE id = ?`,
            [table, id]
        );
        return result;
    },

    async deactivateOrder(id) {
        const [result] = await db.execute(
            `UPDATE orders SET isActivated = FALSE WHERE id = ?`,
            [id]
        );
        return result;
    },

    async activateOrder(id) {
        const [result] = await db.execute(
            `UPDATE orders SET isActivated = TRUE WHERE id = ?`,
            [id]
        );
        return result;
    },

    async addItem(orderId, itemId, itemType, quantity) {
        const [result] = await db.execute(
            `INSERT INTO order_items (orderId, itemId, itemType, quantity)
             VALUES (?, ?, ?, ?)`,
            [orderId, itemId, itemType, quantity]
        );
        return result;
    },

    async findOrderItemById(id) {
        const [rows] = await db.execute(
            `SELECT * FROM order_items WHERE id = ?`,
            [id]
        );
        return rows.length ? new OrderItem(rows[0]) : null;
    },

    async findItemsByOrder(orderId) {
        const [rows] = await db.execute(
            `SELECT * FROM order_items WHERE orderId = ?`,
            [orderId]
        );

        const detailedItems = [];

        for (const item of rows) {
            let table = ""; // table in the DB
            switch (item.itemType) {
                case "entrada":
                    table = "appetizers";
                    break;
                case "receita":
                    table = "recipes";
                    break;
                case "bebida_nao_alcoolica":
                    table = "non_alcoholic_drinks";
                    break;
                case "bebida_alcoolica":
                    table = "alcoholic_drinks";
                    break;
            }
            if (table) {
                const [detail] = await db.execute(
                    `SELECT * FROM ${table} WHERE id = ?`,
                    [item.itemId]
                );
                if (detail.length > 0) {
                    detailedItems.push({
                        ...new OrderItem(item),
                        item: detail[0]
                    });
                }
            }
        }

        return detailedItems;
    },

    async updateItem(id, quantity) {
        const [result] = await db.execute(
            `UPDATE order_items SET quantity = ? WHERE id = ?`,
            [quantity, id]
        );
        console.log("Update result:", result);
        return result;
    },

    async deleteItem(id) {
        const [result] = await db.execute(
            `DELETE FROM order_items WHERE id = ?`,
            [id]
        );
        return result;
    }
};

module.exports = orderRepository;