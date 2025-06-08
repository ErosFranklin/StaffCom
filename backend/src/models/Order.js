class Order {
    constructor({
        id,
        table,
        waiterId,
        chefId,
        isActivated = true,
        createdAt = null
    }){
        this.id = id;
        this.table = table;
        this.waiterId = waiterId;
        this.chefId = chefId;
        this.isActivated = isActivated;
        this.createdAt = createdAt;
    }
}

module.exports = Order;