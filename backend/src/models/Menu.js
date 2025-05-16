class Menu {
  constructor({ 
    id, 
    introduction, 
    recipes = [], 
    drink = [] 
  }){
    this.id = id,
    this.introduction = introduction,
    this.recipes = recipes,
    this.drink = drink;
  }
}

module.exports = Menu;
