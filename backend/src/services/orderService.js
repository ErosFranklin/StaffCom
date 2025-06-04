const orderRepository = require("../repositories/orderRepository");
const waiterRepository = require("../repositories/waiterRepository");
const cookRepository = require("../repositories/cookRepository");

const orderService = {
    async createOrder(table, waiterId, chefId) {
        const waiterExists = await waiterRepository.findById(waiterId);
        if (!waiterExists || waiterExists.isActivated === false) throw new Error("Garçom não encontrado ou desativado!");

        const isChef = await cookRepository.findById(chefId);
        if (!isChef || isChef.role !== 'chef' || isChef.isActivated === false) throw new Error("Chef não encotnrado, não possui cargo de chefe ou está desativado!");

        const result = await orderRepository.createOrder(table, waiterId, chefId);
        return await orderRepository.findById(result.insertId);
    },

    async getOrderById(id) {
        return await orderRepository.findById(id);
    },

    async getAllOrders() {
        return await orderRepository.findAll();
    },

    async getOrdersByWaiter(waiterId) {
        return await orderRepository.findByWaiter(waiterId);
    },

    async getOrdersByChef(chefId) {
        return await orderRepository.findByChef(chefId);
    },

    async updateOrder(id, table) {
        await orderRepository.updateOrder(id, table);
        const updatedOrder = await orderRepository.findById(id);
        return { message: "Comanda atualizada com sucesso!", updatedOrder };
    },

    async deactivateOrder(id) {
        await orderRepository.deactivateOrder(id);
        return { message: "Comanda excluída com sucesso!" };
    },

    async activateOrder(id) {
        await orderRepository.activateOrder(id);
        return { message: "Comanda reativada com sucesso!" };
    },

    async addItemToOrder(orderId, itemId, itemType, quantity) {
        const result = await orderRepository.addItem(orderId, itemId, itemType, quantity);
        const addedItem = await orderRepository.findOrderItemById(result.insertId);
        return { message: "Item adicionado à comanda com sucesso!", addedItem };
    },

    async getItemsByOrder(orderId) {
        return await orderRepository.findItemsByOrder(orderId);
    },

    async updateOrderItem(id, quantity) {
        await orderRepository.updateItem(id, quantity);
        return { message: "Item da comanda atualizado com sucesso!" };
    },

    async deleteOrderItem(id) {
        await orderRepository.deleteItem(id);
        return { message: "Item excluído da comanda com sucesso!" };
    }
};

module.exports = orderService;