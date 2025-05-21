class Drink{
    constructor({
        id,
        drinkName,
        size,
        unitValue,
        drinkImg,
        imagePublicId,
        quantity
    }){
        this.id=id,
        this.drinkName=drinkName,
        this.size=size,
        this.unitValue=unitValue,
        this.drinkImg=drinkImg,
        this.imagePublicId=imagePublicId,
        this.quantity=quantity
    }
}

module.exports=Drink;