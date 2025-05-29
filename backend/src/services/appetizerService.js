const appetizerRepository = require("../repositories/appetizerRepository");

const appetizerService = {
    async create(data) {
        if (!data.foodName) {
            throw new Error("O nome da entrada é obrigatório!");
        }
        if (!data.value) {
            throw new Error("O valor da entrada é obrigatório!");
        }
        if (!data.size) {
            throw new Error("O tamanho da entrada é obrigatório!");
        }

        const result = await appetizerRepository.create(data);
        const createdAppetizer = await appetizerRepository.findById(result.insertId);
        return {
            message: "Entrada criada com sucesso!",
            appetizer: createdAppetizer
        };
    },

    async getAll() {
        const appetizers = await appetizerRepository.findAll();
        return appetizers;
    },

    async getById(id) {
        const appetizer = await appetizerRepository.findById(id);
        if (!appetizer) throw new Error("Entrada não encontrada!");
        return appetizer;
    },

    async update(id, newData) {
        const existingAppetizer = await appetizerRepository.findById(id);
        if (!existingAppetizer) throw new Error("Entrada não encontrada para atualização!");

        await appetizerRepository.update(id, newData);
        return { message: "Entrada atualizada com sucesso!" };
    },

    async delete(id) {
        await appetizerRepository.delete(id);
        return { message: "Entrada excluída com sucesso!" };
    }
}

module.exports = appetizerService;