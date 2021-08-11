const mongoose = require("mongoose");

//Schema
const Schema = mongoose.Schema;
const RecipeSchema = new Schema({
  id: String,
  image: String,
  name: String,
  cookTime: String,
  servings: Number,
  instructions: String,
  ingredients: [{ id: String, name: String, amount: String }],
  author: String,
});

// Model
const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
