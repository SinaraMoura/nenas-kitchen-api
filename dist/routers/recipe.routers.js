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

// src/routers/recipe.routers.ts
var recipe_routers_exports = {};
__export(recipe_routers_exports, {
  RecipeRouter: () => RecipeRouter
});
module.exports = __toCommonJS(recipe_routers_exports);
var import_express = require("express");

// src/controllers/RecipeController.ts
var RecipeController = class {
  constructor(recipeUseCase) {
    this.recipeUseCase = recipeUseCase;
  }
  async create(req, res, next) {
    let recipeData = req.body;
    const files = req.files;
    try {
      if (files) {
        const image = files.image[0];
        recipeData = {
          ...recipeData,
          image: image.filename
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
    const { title, preparation } = req.body;
    const { id } = req.params;
    try {
      const recipe = await this.recipeUseCase.updateRecipes(id, title, preparation);
      return res.status(204).json(recipe);
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
  async updateRecipes(title, preparation) {
    const updateRecipe = await RecipeModel.updateOne({ title, preparation }).exec();
    return updateRecipe;
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
  async updateRecipes(id, title, preparation) {
    const recipe = await this.recipeRepository.findRecipesById(id);
    if (!recipe)
      throw new HttpException(400, "Recipe not found");
    const result = await this.recipeRepository.updateRecipes(title, preparation);
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
      upload.fields([
        {
          name: "image",
          maxCount: 1
        }
      ]),
      this.recipeController.create.bind(this.recipeController)
    );
    this.router.post(
      "/",
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
      "/title",
      this.recipeController.findRecipesByName.bind(this.recipeController)
    );
    this.router.get(
      "/difficulty",
      this.recipeController.findRecipesByDifficulty.bind(this.recipeController)
    );
    this.router.put(
      "/update/:id",
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
