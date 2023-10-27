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

// src/routers/article.routers.ts
var article_routers_exports = {};
__export(article_routers_exports, {
  ArticleRouter: () => ArticleRouter
});
module.exports = __toCommonJS(article_routers_exports);
var import_express = require("express");

// src/controllers/ArticleController.ts
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

// src/repositories/ArticleRepositoryMongoose.ts
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
};

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

// src/infra/multer.ts
var import_multer = __toESM(require("multer"));
var import_node_crypto = __toESM(require("crypto"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var pathName = import_path.default.resolve(__dirname, "tmp", "uploads");
if (!import_fs.default.existsSync(pathName)) {
  import_fs.default.mkdirSync(pathName, { recursive: true });
}
var upload = (0, import_multer.default)({
  dest: pathName,
  limits: { fileSize: 1024 * 1024 * 20 },
  storage: import_multer.default.diskStorage({
    destination(req, file, callback) {
      callback(null, pathName);
    },
    filename(req, file, callback) {
      const fileName = `${import_node_crypto.default.randomBytes(20).toString("hex")}${file.originalname}`;
      callback(null, fileName);
    }
  })
});

// src/routers/article.routers.ts
var ArticleRouter = class {
  constructor() {
    this.router = (0, import_express.Router)();
    const articleRepository = new ArticleRepositoryMongoose();
    const articleUseCase = new ArticleUseCase(articleRepository);
    this.articleController = new ArticleController(articleUseCase);
    this.initRoutes();
  }
  initRoutes() {
    this.router.post(
      "/",
      upload.fields([
        {
          name: "image",
          maxCount: 1
        }
      ]),
      this.articleController.create.bind(this.articleController)
    );
    this.router.post(
      "/",
      this.articleController.create.bind(this.articleController)
    );
    this.router.get(
      "/list",
      this.articleController.findAllArticles.bind(this.articleController)
    );
    this.router.get(
      "/id",
      this.articleController.findArticlesById.bind(this.articleController)
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArticleRouter
});
