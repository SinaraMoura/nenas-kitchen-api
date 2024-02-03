"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/infra/storage.ts
var require_storage = __commonJS({
  "src/infra/storage.ts"(exports, module2) {
    "use strict";
    require("dotenv").config();
    var aws = require("aws-sdk");
    var endpoint = new aws.Endpoint(process.env.endpoint_s3);
    var s3 = new aws.S3({
      endpoint,
      credentials: {
        accessKeyId: process.env.id_key,
        secretAccessKey: process.env.app_key
      }
    });
    var uploadFile2 = async (path, buffer, mimetype) => {
      const arquivo = await s3.upload({
        Bucket: process.env.bucket,
        Key: path,
        Body: buffer,
        ContentType: mimetype
      }).promise();
      return {
        url: arquivo.Location,
        path: arquivo.Key
      };
    };
    var listFile = async () => {
      const arquivos = await s3.listObjects({
        Bucket: process.env.bucket
      }).promise();
      const files = arquivos.Contents.map((file) => {
        return {
          url: `https://${process.env.bucket}.${process.env.endpoint_s3}/${file.Key}`,
          path: file.Key
        };
      });
      return files;
    };
    module2.exports = { uploadFile: uploadFile2, listFile };
  }
});

// src/controllers/ArticleController.ts
var ArticleController_exports = {};
__export(ArticleController_exports, {
  ArticleController: () => ArticleController
});
module.exports = __toCommonJS(ArticleController_exports);
var { uploadFile } = require_storage();
var ArticleController = class {
  constructor(articleUseCase) {
    this.articleUseCase = articleUseCase;
  }
  async create(req, res, next) {
    let articleData = req.body;
    const file = req.file;
    try {
      if (file) {
        const arquivo = await uploadFile(
          `imagens/${file.originalname}`,
          file.buffer,
          file.mimetype
        );
        articleData = {
          ...articleData,
          image: arquivo.url
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
  async deleteArticle(req, res, next) {
    const { id } = req.params;
    try {
      const article = await this.articleUseCase.deleteArticle(id);
      return res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
  async updateArticle(req, res, next) {
    let articleData = req.body;
    const file = req.file;
    const { id } = req.params;
    try {
      if (file) {
        const arquivo = await uploadFile(
          `imagens/${file.originalname}`,
          file.buffer,
          file.mimetype
        );
        articleData = {
          ...articleData,
          image: arquivo.url
        };
      }
      await this.articleUseCase.updateArticle(id, articleData);
      return res.status(204).json({ message: "Artigo atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArticleController
});
