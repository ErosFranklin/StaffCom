const DrinkRepository = require('../repositories/drinkRepository.js');

class DrinkService {
    async create(drinkData) {
        // Regra de negócio: impedir nome duplicado
        const existing = await DrinkRepository.findByName(drinkData.drinkName);
        if (existing) {
            throw new Error('Já existe uma bebida com esse nome.');
        }

        const newDrink = await DrinkRepository.create(drinkData);
        return newDrink;
    }

    async getAll() {
        return await DrinkRepository.findAll();
    }

    async getById(id) {
        const drink = await DrinkRepository.findById(id);
        if (!drink) {
            throw new Error('Bebida não encontrada.');
        }
        return drink;
    }

    async update(id, drinkData) {
        const existing = await DrinkRepository.findById(id);
        if (!existing) {
            throw new Error('Bebida não encontrada.');
        }

        await DrinkRepository.update(id, drinkData);
        return { id, ...drinkData };
    }

    async delete(id) {
        const existing = await DrinkRepository.findById(id);
        if (!existing) {
            throw new Error('Bebida não encontrada.');
        }

        await DrinkRepository.delete(id);
    }
}

module.exports = new DrinkService();