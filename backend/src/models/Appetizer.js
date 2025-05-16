const Recipes = require("../models/Recipes.js");

class Appetizer extends Recipes {
  constructor(props) {
    super(props);
    this.size = props.size;
  }
}

module.exports = Appetizer;