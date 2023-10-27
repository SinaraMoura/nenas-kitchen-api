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

// src/controllers/ArticleController.ts
var ArticleController_exports = {};
__export(ArticleController_exports, {
  ArticleController: () => ArticleController
});
module.exports = __toCommonJS(ArticleController_exports);
var ArticleController = class {
  constructor(articleUseCase) {
    this.articleUseCase = articleUseCase;
  }
  async create(req, res, next) {
    let articleData = req.body;
    const files = req.files;
    try {
      if (files) {
        const image = files.image[0];
        articleData = {
          ...articleData,
          image: image.filename
        };
      }
      await this.articleUseCase.create(articleData);
      return res.status(201).json({ message: "Artigo adicionado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
  async findAllArticles(req, res, next) {
    try {
      const articles = await this.articleUseCase.findAllArticles();
      return res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }
  async findArticlesById(req, res, next) {
    const { id } = req.query;
    try {
      const article = await this.articleUseCase.findArticlesById(String(id));
      return res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArticleController
});
