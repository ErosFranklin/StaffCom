const Drink = require('../models/Drink.js');

class AlcoholicDrink extends Drink{
    constructor(props){
        super(props);
        this.drinkType=props.drinkType
    }
}

module.exports=AlcoholicDrink;

