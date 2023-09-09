"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/RecipeRepositoryMongoose.ts
var RecipeRepositoryMongoose_exports = {};
__export(RecipeRepositoryMongoose_exports, {
  RecipeRepositoryMongoose: () => RecipeRepositoryMongoose
});
module.exports = __toCommonJS(RecipeRepositoryMongoose_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var recipeSchema = new import_mongoose.default.Schema({
  _id: {
    type: String,
    default: new import_mongoose.default.Types.ObjectId().toString()
  },
  title: String,
  ingredients: [String],
  duration: String,
  proceeds: String,
  preparation: [String],
  difficulty: String,
  date: Date,
  category: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var RecipeModel = import_mongoose.default.model("Recipe", recipeSchema);
var RecipeRepositoryMongoose = class {
  async addRecipe(recipe) {
    recipe._id = (0, import_uuid.v4)();
    const recipeModel = new RecipeModel(recipe);
    await recipeModel.save();
    return recipe;
  }
  async findAllRecipe() {
    const findRecipe = await RecipeModel.find().exec();
    return findRecipe.map((recipe) => recipe.toObject());
  }
  async findRecipesById(id) {
    const findRecipe = await RecipeModel.findById({ _id: id }).exec();
    return findRecipe ? findRecipe.toObject() : void 0;
  }
  async findRecipesByCategory(category) {
    const findRecipe = await RecipeModel.find({ category }).exec();
    return findRecipe.map((recipe) => recipe.toObject());
  }
  async findRecipesByName(name) {
    const findRecipe = await RecipeModel.find({
      title: {
        $regex: name,
        $options: "i"
      }
    }).exec();
    return findRecipe.map((recipe) => recipe.toObject());
  }
  async findRecipesByDifficulty(name) {
    const findRecipe = await RecipeModel.find({
      difficulty: {
        $regex: name,
        $options: "i"
      }
    }).exec();
    return findRecipe.map((recipe) => recipe.toObject());
  }
  async updateRecipes(title, preparation) {
    const updateRecipe = await RecipeModel.updateOne({ title, preparation }).exec();
    return updateRecipe;
  }
  async deleteRecipes(id) {
    const deleteRecipe = await RecipeModel.deleteOne({ _id: id }).exec();
    return deleteRecipe;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecipeRepositoryMongoose
});
