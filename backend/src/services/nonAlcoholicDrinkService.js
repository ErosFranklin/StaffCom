const nonAlcoholicDrinkRepository = require('../repositories/NonAlcoholicDrinkRepository');

class NonAlcoholicDrinkService {
  async create(data) {
    const drink = await nonAlcoholicDrinkRepository.create(data);
    return {
      mensagem: 'Bebida não alcoólica cadastrada com sucesso!',
      drink: drink
    };
  }

  async getAll() {
    const drinks = await nonAlcoholicDrinkRepository.findAll();
    return {
      mensagem: 'Lista de bebidas não alcoólicas encontrada com sucesso!',
      drinks: drinks
    };
  }

  async getById(id) {
    const drink = await nonAlcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida não alcoólica não encontrada.');
    return {
      mensagem: 'Bebida não alcoólica encontrada com sucesso!',
      drink: drink
    };
  }

  async update(id, data) {
    const drink = await nonAlcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida não alcoólica não encontrada.'); // Validation
    const updated = await nonAlcoholicDrinkRepository.update(id, data);
    return { mensagem: 'Bebida não alcoólica atualizada com sucesso!' };
  }

  async delete(id) {
    const drink = await nonAlcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida não alcoólica não encontrada.'); // Validation
    await nonAlcoholicDrinkRepository.delete(id);
    return { mensagem: 'Bebida não alcoólica excluída com sucesso!' };
  }
}

module.exports = new NonAlcoholicDrinkService();
