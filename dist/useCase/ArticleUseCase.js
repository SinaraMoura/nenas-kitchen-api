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

// src/useCase/ArticleUseCase.ts
var ArticleUseCase_exports = {};
__export(ArticleUseCase_exports, {
  ArticleUseCase: () => ArticleUseCase
});
module.exports = __toCommonJS(ArticleUseCase_exports);

// src/interfaces/HttpException.ts
var HttpException = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

// src/useCase/ArticleUseCase.ts
var ArticleUseCase = class {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }
  async create(articleData) {
    if (!articleData.title) {
      throw new HttpException(400, "Title is required");
    }
    if (!articleData.text) {
      throw new HttpException(400, "Text is required");
    }
    const result = await this.articleRepository.addArticle(articleData);
    return result;
  }
  async findAllArticles() {
    const result = await this.articleRepository.findAllArticle();
    return result;
  }
  async findArticlesById(id) {
    if (!id)
      throw new HttpException(400, "Id is required");
    const result = await this.articleRepository.findArticlesById(id);
    return result;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArticleUseCase
});
