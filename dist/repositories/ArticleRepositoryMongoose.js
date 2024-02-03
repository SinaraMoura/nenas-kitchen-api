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

// src/repositories/ArticleRepositoryMongoose.ts
var ArticleRepositoryMongoose_exports = {};
__export(ArticleRepositoryMongoose_exports, {
  ArticleRepositoryMongoose: () => ArticleRepositoryMongoose
});
module.exports = __toCommonJS(ArticleRepositoryMongoose_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var articleSchema = new import_mongoose.default.Schema({
  _id: {
    type: String,
    default: new import_mongoose.default.Types.ObjectId().toString()
  },
  title: String,
  description: String,
  text: [String],
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var ArticleModel = import_mongoose.default.model("Articles", articleSchema);
var ArticleRepositoryMongoose = class {
  async addArticle(article) {
    article._id = (0, import_uuid.v4)();
    const articleModel = new ArticleModel(article);
    await articleModel.save();
    return article;
  }
  async findAllArticle() {
    const findArticle = await ArticleModel.find().exec();
    return findArticle.map((article) => article.toObject());
  }
  async findArticlesById(id) {
    const findArticle = await ArticleModel.findById({ _id: id }).exec();
    return findArticle ? findArticle.toObject() : void 0;
  }
  async deleteArticle(id) {
    const deleteArticle = await ArticleModel.deleteOne({ _id: id }).exec();
    return deleteArticle;
  }
  async updateArticle(id, article) {
    const updateArticle = await ArticleModel.findOneAndUpdate({ _id: id }, article, { new: true }).exec();
    return updateArticle ? updateArticle.toObject() : void 0;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArticleRepositoryMongoose
});
