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

// src/controllers/RecipeController.ts
var RecipeController_exports = {};
__export(RecipeController_exports, {
  RecipeController: () => RecipeController
});
module.exports = __toCommonJS(RecipeController_exports);
var { uploadFile } = require_storage();
var RecipeController = class {
  constructor(recipeUseCase) {
    this.recipeUseCase = recipeUseCase;
  }
  async create(req, res, next) {
    let recipeData = req.body;
    const file = req.file;
    try {
      if (file) {
        const arquivo = await uploadFile(
          `imagens/${file.originalname}`,
          file.buffer,
          file.mimetype
        );
        recipeData = {
          ...recipeData,
          image: arquivo.url
        };
      }
      await this.recipeUseCase.create(recipeData);
      return res.status(201).json({ message: "Receita adicionada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
  async findAllRecipes(req, res, next) {
    try {
      const recipes = await this.recipeUseCase.findAllRecipes();
      return res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  }
  async findRecipesById(req, res, next) {
    const { id } = req.query;
    try {
      const recipe = await this.recipeUseCase.findRecipesById(String(id));
      return res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
  async findRecipesByCategory(req, res, next) {
    const { category } = req.params;
    try {
      const recipe = await this.recipeUseCase.findRecipesByCategory(category);
      return res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
  async findAllRecipesByCategory(req, res, next) {
    try {
      const recipes = await this.recipeUseCase.findAllRecipes();
      const categoriesSet = new Set(recipes.map((recipe) => recipe.category));
      const categoriesArray = Array.from(categoriesSet);
      const categorizedRecipes = categoriesArray.map((category) => ({
        category,
        recipes: recipes.filter((recipe) => recipe.category === category)
      }));
      return res.status(200).json(categorizedRecipes);
    } catch (error) {
      next(error);
    }
  }
  async findRecipesByName(req, res, next) {
    const { name } = req.query;
    try {
      const recipe = await this.recipeUseCase.findRecipesByName(String(name));
      return res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
  async findRecipesByDifficulty(req, res, next) {
    const { name } = req.query;
    try {
      const recipe = await this.recipeUseCase.findRecipesByDifficylty(String(name));
      return res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
  async updateRecipes(req, res, next) {
    let recipeData = req.body;
    const file = req.file;
    const { id } = req.params;
    try {
      if (file) {
        const arquivo = await uploadFile(
          `imagens/${file.originalname}`,
          file.buffer,
          file.mimetype
        );
        recipeData = {
          ...recipeData,
          image: arquivo.url
        };
      }
      await this.recipeUseCase.updateRecipes(id, recipeData);
      return res.status(204).json({ message: "Receita atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
  async deleteRecipes(req, res, next) {
    const { id } = req.params;
    try {
      const recipe = await this.recipeUseCase.deleteRecipes(id);
      return res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecipeController
});
