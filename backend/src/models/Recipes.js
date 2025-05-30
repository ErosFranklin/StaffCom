class Recipes{
    constructor({
        id,
        foodName,
        foodDescription,
        value,
        foodImg,
        imagePublicId
    }){
        this.id=id,
        this.foodName=foodName,
        this.foodDescription=foodDescription,
        this.value=value,
        this.foodImg=foodImg
        this.imagePublicId = imagePublicId;
    }
}

module.exports=Recipes;