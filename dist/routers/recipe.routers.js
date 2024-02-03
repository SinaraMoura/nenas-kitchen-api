"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/routers/recipe.routers.ts
var recipe_routers_exports = {};
__export(recipe_routers_exports, {
  RecipeRouter: () => RecipeRouter
});
module.exports = __toCommonJS(recipe_routers_exports);
var import_express = require("express");

// src/controllers/RecipeController.ts
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

// src/repositories/RecipeRepositoryMongoose.ts
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
  async updateRecipes(id, recipe) {
    const updateRecipe = await RecipeModel.findOneAndUpdate({ _id: id }, recipe, { new: true }).exec();
    return updateRecipe ? updateRecipe.toObject() : void 0;
  }
  async deleteRecipes(id) {
    const deleteRecipe = await RecipeModel.deleteOne({ _id: id }).exec();
    return deleteRecipe;
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

// src/infra/multer.ts
var import_multer = __toESM(require("multer"));
var upload = (0, import_multer.default)({});

// src/routers/recipe.routers.ts
var RecipeRouter = class {
  constructor() {
    this.router = (0, import_express.Router)();
    const recipeRepository = new RecipeRepositoryMongoose();
    const recipeUseCase = new RecipeUseCase(recipeRepository);
    this.recipeController = new RecipeController(recipeUseCase);
    this.initRoutes();
  }
  initRoutes() {
    this.router.post(
      "/",
      upload.single("image"),
      this.recipeController.create.bind(this.recipeController)
    );
    this.router.get(
      "/list",
      this.recipeController.findAllRecipes.bind(this.recipeController)
    );
    this.router.get(
      "/id",
      this.recipeController.findRecipesById.bind(this.recipeController)
    );
    this.router.get(
      "/category/:category",
      this.recipeController.findRecipesByCategory.bind(this.recipeController)
    );
    this.router.get(
      "/category",
      this.recipeController.findAllRecipesByCategory.bind(this.recipeController)
    );
    this.router.get(
      "/title",
      this.recipeController.findRecipesByName.bind(this.recipeController)
    );
    this.router.get(
      "/difficulty",
      this.recipeController.findRecipesByDifficulty.bind(this.recipeController)
    );
    this.router.put(
      "/update/:id",
      upload.single("image"),
      this.recipeController.updateRecipes.bind(this.recipeController)
    );
    this.router.delete(
      "/delete/:id",
      this.recipeController.deleteRecipes.bind(this.recipeController)
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecipeRouter
});
