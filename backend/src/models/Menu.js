class Menu {
  constructor({
    id,
    ownerId,
    itemType,
    itemId
  }) {
    this.id = id;
    this.ownerId = ownerId;
    this.itemType = itemType;
    this.itemId = itemId;
  }
}

module.exports = Menu;
