const Drink = require('./Drink.js')

class NonAlcoholicDrink extends Drink{
    constructor(props){
        super(props);
        this.packagingType=props.packagingType;
    }
}

module.exports=NonAlcoholicDrink;