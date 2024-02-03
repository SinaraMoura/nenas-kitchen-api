"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useCase/RecipeUseCase.ts
var RecipeUseCase_exports = {};
__export(RecipeUseCase_exports, {
  RecipeUseCase: () => RecipeUseCase
});
module.exports = __toCommonJS(RecipeUseCase_exports);

// src/interfaces/HttpException.ts
var HttpException = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

// src/useCase/RecipeUseCase.ts
var RecipeUseCase = class {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }
  async create(recipeData) {
    if (!recipeData.title) {
      throw new HttpException(400, "Title is required");
    }
    if (!recipeData.preparation) {
      throw new HttpException(400, "Preparation is required");
    }
    if (!recipeData.ingredients) {
      throw new HttpException(400, "Ingredients is required");
    }
    if (!recipeData.category) {
      throw new HttpException(400, "Category is required");
    }
    if (!recipeData.image) {
      throw new HttpException(400, "Image is required");
    }
    const result = await this.recipeRepository.addRecipe(recipeData);
    return result;
  }
  async findAllRecipes() {
    const result = await this.recipeRepository.findAllRecipe();
    return result;
  }
  async findRecipesById(id) {
    if (!id)
      throw new HttpException(400, "Id is required");
    const result = await this.recipeRepository.findRecipesById(id);
    return result;
  }
  async findRecipesByCategory(category) {
    if (!category)
      throw new HttpException(400, "Category is required");
    const result = await this.recipeRepository.findRecipesByCategory(category);
    return result;
  }
  async findRecipesByName(name) {
    if (!name)
      throw new HttpException(400, "Name is required");
    const result = await this.recipeRepository.findRecipesByName(name);
    return result;
  }
  async findRecipesByDifficylty(name) {
    if (!name)
      throw new HttpException(400, "Name is required");
    const result = await this.recipeRepository.findRecipesByDifficulty(name);
    return result;
  }
  async updateRecipes(id, recipeData) {
    const recipe = await this.recipeRepository.findRecipesById(id);
    if (!recipe)
      throw new HttpException(400, "Recipe not found");
    const result = await this.recipeRepository.updateRecipes(id, recipeData);
    return result;
  }
  async deleteRecipes(id) {
    const recipe = await this.recipeRepository.findRecipesById(id);
    if (!recipe)
      throw new HttpException(400, "Recipe not found");
    const result = await this.recipeRepository.deleteRecipes(id);
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecipeUseCase
});
