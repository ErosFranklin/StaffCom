const alcoholicDrinkRepository = require('../repositories/AlcoholicDrinkRepository');

class AlcoholicDrinkService {
  async create(data) {
    const drink = await alcoholicDrinkRepository.create(data);
    return {
      mensagem: 'Bebida alcoólica cadastrada com sucesso!',
      bebida: drink
    };
  }

  async findAll() {
    const drinks = await alcoholicDrinkRepository.findAll();
    return {
      mensagem: 'Lista de bebidas alcoólicas encontrada com sucesso!',
      bebidas: drinks
    };
  }

  async findById(id) {
    const drink = await alcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida alcoólica não encontrada.');
    return {
      mensagem: 'Bebida alcoólica encontrada com sucesso!',
      bebida: drink
    };
  }

  async update(id, data) {
    await this.findById(id); // Validação
    const updated = await alcoholicDrinkRepository.update(id, data);
    return {
      mensagem: 'Bebida alcoólica atualizada com sucesso!',
      bebida: updated
    };
  }

  async delete(id) {
    const drink = await nonAlcoholicDrinkRepository.findById(id);
    if (!drink) throw new Error('Bebida alcoólica não encontrada.'); // Validação
    await alcoholicDrinkRepository.delete(id);
    return { mensagem: 'Bebida alcoólica excluída com sucesso!' };
  }
}

module.exports = new AlcoholicDrinkService();
