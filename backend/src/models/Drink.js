class Drink{
    constructor({
        id,
        drinkName,
        size,
        unitValue,
        drinkImg,
        quantity
    }){
        this.id=id,
        this.drinkName=drinkName,
        this.size=size,
        this.unitValue=unitValue,
        this.drinkImg=drinkImg,
        this.quantity=quantity
    }
}

module.exports=Drink;