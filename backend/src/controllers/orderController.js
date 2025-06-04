const orderService = require("../services/orderService");

const orderController = {
    async createOrder(req, res) {
        try {
            const waiterId = req.waiterId;
            const chefId = req.params.chefId;
            const { table } = req.body;
            const order = await orderService.createOrder(table, waiterId, chefId);
            return res.status(201).json(order);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getOrderById(req, res) {
        try {
            const id = req.params.orderId;
            const order = await orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ error: "Comanda não encontrada!" });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getOrdersByWaiter(req, res) {
        try {
            const waiterId = req.params.waiterId;
            const orders = await orderService.getOrdersByWaiter(waiterId);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getMyOrdersAsWaiter(req, res) {
        try {
            const waiterId = req.waiterId;
            const orders = await orderService.getOrdersByWaiter(waiterId);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getOrdersByChef(req, res) {
        try {
            const chefId = req.params.chefId;
            const orders = await orderService.getOrdersByChef(chefId);
            return res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getMyOrdersAsChef(req, res) {
        try {
            const chefId = req.cookId;
            const orders = await orderService.getOrdersByChef(chefId);
            return res.status(200).json(orders);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateOrder(req, res) {
        try {
            const id = req.params.orderId;
            const { table } = req.body;
            const response = await orderService.updateOrder(id, table);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deactivateOrder(req, res) {
        try {
            const id = req.params.orderId;
            const response = await orderService.deactivateOrder(id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async activateOrder(req, res) {
        try {
            const id = req.params.orderId;
            const response = await orderService.activateOrder(id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async addItemToOrder(req, res) {
        try {
            const orderId = parseInt(req.params.orderId);
            const { itemId, itemType, quantity } = req.body;
            const response = await orderService.addItemToOrder(orderId, parseInt(itemId), itemType, parseInt(quantity));
            return res.status(201).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getItemsByOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            const items = await orderService.getItemsByOrder(orderId);
            return res.status(200).json(items);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async updateOrderItem(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const response = await orderService.updateOrderItem(parseInt(id), parseInt(quantity));
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async deleteOrderItem(req, res) {
        try {
            const { id } = req.params;
            const response = await orderService.deleteOrderItem(id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = orderController;