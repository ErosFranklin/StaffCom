const nonAlcoholicDrinkRepository = require("../repositories/nonAlcoholicDrinkRepository");
const drinkRepository = require("../repositories/drinkRepository");

const nonAlcoholicDrinkService = {
    async getNonAlcoholicByDrinkId(id) {
        const drink = await drinkRepository.findById(id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        const details = await nonAlcoholicDrinkRepository.findByDrinkId(id);
        if (!details) throw new Error("Detalhes da bebida não alcoólica não encontrada");

        return { ...drink, ...details };
    },

    async createNonAlcoholicDrink(data) {
        const drink = await drinkRepository.findById(data.id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        return await nonAlcoholicDrinkRepository.create(data);
    },

    async updateNonAlcoholicDrink(id, data) {
        const drink = await drinkRepository.findById(id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        await nonAlcoholicDrinkRepository.update(id, data);
        return { id, ...data };
    },

    async deleteNonAlcoholicDrink(id) {
        const drink = await drinkRepository.findById(id);
        if (!drink) throw new Error("Bebida Não Encontrada");

        await nonAlcoholicDrinkRepository.delete(id);
        return { message: "Bebida não alcoólica deletada com sucesso" };
    }
};

module.exports = nonAlcoholicDrinkService;
