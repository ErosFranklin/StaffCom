const nonAlcoholicDrinkRepository = require('../repositories/NonAlcoholicDrinkRepository');

class NonAlcoholicDrinkService {
  async create(data) {
    const drink = await nonAlcoholicDrinkRepository.create(data);
    return {
      mensagem: 'Bebida não alcoólica cadastrada com sucesso!',
      bebida: drink
    };
  }

  async findAll() {
    const drinks = await nonAlcoholicDrinkRepository.findAll();
    return {
      mensagem: 'Lista de bebidas não alcoólicas encontrada com sucesso!',
      bebidas: drinks
    };
  }

  async findById(id) {
    const drink = await nonAlcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida não alcoólica não encontrada.');
    return {
      mensagem: 'Bebida não alcoólica encontrada com sucesso!',
      bebida: drink
    };
  }

  async update(id, data) {
    await this.findById(id); // Validação
    const updated = await nonAlcoholicDrinkRepository.update(id, data);
    return {
      mensagem: 'Bebida não alcoólica atualizada com sucesso!',
      bebida: updated
    };
  }

  async delete(id) {
    await this.findById(id); // Validação
    await nonAlcoholicDrinkRepository.delete(id);
    return { mensagem: 'Bebida não alcoólica excluída com sucesso!' };
  }
}

module.exports = new NonAlcoholicDrinkService();
