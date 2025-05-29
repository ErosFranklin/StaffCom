const alcoholicDrinkRepository = require('../repositories/AlcoholicDrinkRepository');

class AlcoholicDrinkService {
  async create(data) {
    const drink = await alcoholicDrinkRepository.create(data);
    return {
      mensagem: 'Bebida alcoólica cadastrada com sucesso!',
      drink: drink
    };
  }

  async getAll() {
    const drinks = await alcoholicDrinkRepository.findAll();
    return {
      mensagem: 'Lista de bebidas alcoólicas encontrada com sucesso!',
      drink: drinks
    };
  }

  async getById(id) {
    const drink = await alcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida alcoólica não encontrada.');
    return {
      mensagem: 'Bebida alcoólica encontrada com sucesso!',
      drink: drink
    };
  }

  async update(id, data) {
    const drink = await alcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida alcoólica não encontrada.'); // Validation
    const updated = await alcoholicDrinkRepository.update(id, data);
    return { mensagem: 'Bebida não alcoólica atualizada com sucesso!' };
  }

  async delete(id) {
    const drink = await alcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida alcoólica não encontrada.'); // Validação
    await alcoholicDrinkRepository.delete(id);
    return { mensagem: 'Bebida alcoólica excluída com sucesso!' };
  }
}

module.exports = new AlcoholicDrinkService();
