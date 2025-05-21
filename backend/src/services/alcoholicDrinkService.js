const alcoholicDrinkRepository = require("../repositories/alcoholicDrinkRepository");
const drinkRepository = require("../repositories/drinkRepository");

const alcoholicDrinkService = {
    async getAlcoholicByDrinkId(id) {
        const drink = await drinkRepository.findById(id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        const details = await alcoholicDrinkRepository.findByDrinkId(id);
        if (!details) throw new Error("Detalhes da bebida alcoólica não encontrada");

        return { ...drink, ...details };
    },

    async createAlcoholicDrink(data) {
        const drink = await drinkRepository.findById(data.id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        return await alcoholicDrinkRepository.create(data);
    },

    async updateAlcoholicDrink(id, data) {
        const drink = await drinkRepository.findById(id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        await alcoholicDrinkRepository.update(id, data);
        return { id, ...data };
    },

    async deleteAlcoholicDrink(id) {
        const drink = await drinkRepository.findById(id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        await alcoholicDrinkRepository.delete(id);
        return { message: "Bebida alcoólica deletada com sucesso" };
    }
};

module.exports = alcoholicDrinkService;
