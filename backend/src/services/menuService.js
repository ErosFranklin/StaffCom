const menuRepository = require("../repositories/menuRepository");

const menuService = {
    async addItemToMenu(ownerId, itemType, itemId) {
        console.log(ownerId, itemType, itemId)
        if (!ownerId) throw new Error("Impossível adicionar um item ao cardápio sem saber quem é o proprietário!");
        if (!itemId) throw new Error("Impossível adicionar item ao cardápio sem saber seu id!");

        const result = await menuRepository.create(ownerId, itemType, itemId);
        const addedItem = await menuRepository.findById(result.insertId);

        return {
            message: "Item adicionado ao cardápio com sucesso!",
            item: addedItem
        };
    },

    async getById(id) {
        const item = await menuRepository.findById(id);
        if (!item) throw new Error("Item não adicionado ao cardápio!");
        return item;
    },
    async getItemById(menuId) {
        const row = await menuRepository.findItemById(menuId);
        if (!row) throw new Error("Item não encontrado no cardápio!");

        let item = null;

        switch (row.itemType) {
            case 'receita':
                item = {
                    id: row.recipeId,
                    foodName: row.recipeName,
                    description: row.recipeDescription,
                    value: row.recipeValue,
                    foodImg: row.recipeImg,
                    imagePublicId: row.recipeImgPublicId
                };
                break;

            case 'entrada':
                item = {
                    id: row.appetizerId,
                    foodName: row.appetizerName,
                    description: row.appetizerDescription,
                    value: row.appetizerValue,
                    foodImg: row.appetizerImg,
                    imagePublicId: row.appetizerImgPublicId,
                    size: row.appetizerSize
                };
                break;

            case 'bebida_alcoolica':
                item = {
                    id: row.alcoholicId,
                    drinkName: row.alcoholicName,
                    size: row.alcoholicSize,
                    unitValue: row.alcoholicValue,
                    drinkImg: row.alcoholicImg,
                    imagePublicId: row.alcoholicImgPublicId,
                    quantity: row.alcoholicQuantity,
                    drinkType: row.alcoholicDrinkType
                };
                break;

            case 'bebida_nao_alcoolica':
                item = {
                    id: row.nonAlcoholicId,
                    drinkName: row.nonAlcoholicName,
                    size: row.nonAlcoholicSize,
                    unitValue: row.nonAlcoholicValue,
                    drinkImg: row.nonAlcoholicImg,
                    imagePublicId: row.nonAlcoholicImgPublicId,
                    quantity: row.nonAlcoholicQuantity,
                    packagingType: row.nonAlcoholicPackagingType
                };
                break;
        }

        return {
            id: row.menuId,
            itemType: row.itemType,
            itemId: row.itemId,
            ownerId: row.ownerId,
            item
        };
    },


    async getAll() {
        const allItens = await menuRepository.findAll();
        return allItens;
    },

    async getFullMenu(ownerId) {
        const rows = await menuRepository.findFullMenuByOwner(ownerId);

        return rows.map(row => {
            let item = null;

            switch (row.itemType) {
                case 'receita':
                    item = {
                        id: row.recipeId,
                        foodName: row.recipeName,
                        description: row.recipeDescription,
                        value: row.recipeValue,
                        foodImg: row.recipeImg,
                        imagePublicId: row.recipeImgPublicId
                    };
                    break;

                case 'entrada':
                    item = {
                        id: row.appetizerId,
                        foodName: row.appetizerName,
                        description: row.appetizerDescription,
                        value: row.appetizerValue,
                        foodImg: row.appetizerImg,
                        imagePublicId: row.appetizerImgPublicId,
                        size: row.appetizerSize
                    };
                    break;

                case 'bebida_alcoolica':
                    item = {
                        id: row.alcoholicId,
                        drinkName: row.alcoholicName,
                        size: row.alcoholicSize,
                        unitValue: row.alcoholicValue,
                        drinkImg: row.alcoholicImg,
                        imagePublicId: row.alcoholicImgPublicId,
                        quantity: row.alcoholicQuantity,
                        drinkType: row.alcoholicDrinkType
                    };
                    break;

                case 'bebida_nao_alcoolica':
                    item = {
                        id: row.nonAlcoholicId,
                        drinkName: row.nonAlcoholicName,
                        size: row.nonAlcoholicSize,
                        unitValue: row.nonAlcoholicValue,
                        drinkImg: row.nonAlcoholicImg,
                        imagePublicId: row.nonAlcoholicImgPublicId,
                        quantity: row.nonAlcoholicQuantity,
                        packagingType: row.nonAlcoholicPackagingType
                    };
                    break;
            }

            return {
                id: row.menuId,
                itemType: row.itemType,
                itemId: row.itemId,
                ownerId: row.ownerId,
                item
            };
        });
    },

    async update(id, newData) {
        const existingItem = await menuRepository.findById(id);
        if (!existingItem) throw new Error("Item não adicionado ao cardápio!");

        await menuRepository.update(id, newData);
        return { message: "Cardápio atualizado com sucesso!" };
    },

    async removeItemFromMenu(id) {
        const existingItem = await menuRepository.findById(id);
        if (!existingItem) throw new Error("Item não adicionado ao cardápio!");

        await menuRepository.delete(id);
        return { message: "Item removido do cardápio!" };
    }
};

module.exports = menuService;