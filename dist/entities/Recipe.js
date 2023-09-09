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

// src/entities/Recipe.ts
var Recipe_exports = {};
__export(Recipe_exports, {
  Recipe: () => Recipe
});
module.exports = __toCommonJS(Recipe_exports);
var Recipe = class {
  constructor(_id, title, ingredients, proceeds, duration, preparation, difficulty, date, category, image) {
    this._id = _id;
    this.title = title;
    this.ingredients = ingredients;
    this.proceeds = proceeds;
    this.duration = duration;
    this.preparation = preparation;
    this.difficulty = difficulty;
    this.date = date;
    this.category = category;
    this.image = image;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Recipe
});
