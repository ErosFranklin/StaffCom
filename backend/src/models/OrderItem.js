class OrderItem {
    constructor({
        id,
        orderId,
        itemId,
        itemType,
        quantity
    }){
        this.id = id;
        this.orderId = orderId;
        this.itemId = itemId;
        this.itemType = itemType;
        this.quantity = quantity;
    }
}

module.exports = OrderItem;