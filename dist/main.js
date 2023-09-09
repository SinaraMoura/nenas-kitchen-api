"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/app.ts
var import_cors = __toESM(require("cors"));
var import_express3 = __toESM(require("express"));
var import_node_path = __toESM(require("path"));

// src/infra/database.ts
var import_mongoose = __toESM(require("mongoose"));
async function connect() {
  try {
    await import_mongoose.default.connect("mongodb+srv://nenaskitchen:OYVmSu4cp2kuGnaB@cluster0.agncpdt.mongodb.net/nenaskitchen", { useNewUrlParser: true });
    console.log("Database connect success");
  } catch (error) {
    console.log("\u{1F680} ~ file: database.ts:9 ~ connect ~ error:", error);
  }
}

// src/middlewares/error.middlewares.ts
function errorMiddleware(err, req, res, next) {
  const status = err.status ?? 500;
  const message = err.message ?? "Internal server error";
  res.status(status).json({
    status,
    message
  });
}

// src/routers/recipe.routers.ts
var import_express = require("express");

// src/controllers/RecipeController.ts
var RecipeController = class {
  constructor(recipeUseCase) {
    this.recipeUseCase = recipeUseCase;
  }
  async create(req, res, next) {
    let recipeData = req.body;
    const files = req.files;
    console.log("\u{1F680} ~ file: RecipeController.ts:14 ~ RecipeController ~ create ~ files:", files);
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
    const { id } = req.params;
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
var import_mongoose2 = __toESM(require("mongoose"));
var import_uuid = require("uuid");
var recipeSchema = new import_mongoose2.default.Schema({
  _id: {
    type: String,
    default: new import_mongoose2.default.Types.ObjectId().toString()
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
var RecipeModel = import_mongoose2.default.model("Recipe", recipeSchema);
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
      "/id/:id",
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

// src/routers/article.routers.ts
var import_express2 = require("express");

// src/controllers/ArticleController.ts
var ArticleController = class {
  constructor(articleUseCase) {
    this.articleUseCase = articleUseCase;
  }
  async create(req, res, next) {
    let articleData = req.body;
    const files = req.files;
    if (files) {
      const image = files.image[0];
      articleData = {
        ...articleData,
        image: image.filename
      };
    }
    try {
      await this.articleUseCase.create(articleData);
      console.log("\u{1F680} ~ file: ArticleController.ts:13 ~ ArticleController ~ create ~ articleData:", articleData);
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
    const { id } = req.params;
    try {
      const article = await this.articleUseCase.findArticlesById(String(id));
      return res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
};

// src/repositories/ArticleRepositoryMongoose.ts
var import_mongoose3 = __toESM(require("mongoose"));
var import_uuid2 = require("uuid");
var articleSchema = new import_mongoose3.default.Schema({
  _id: {
    type: String,
    default: new import_mongoose3.default.Types.ObjectId().toString()
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
var ArticleModel = import_mongoose3.default.model("Articles", articleSchema);
var ArticleRepositoryMongoose = class {
  async addArticle(article) {
    article._id = (0, import_uuid2.v4)();
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

// src/routers/article.routers.ts
var ArticleRouter = class {
  constructor() {
    this.router = (0, import_express2.Router)();
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
      "/id/:id",
      this.articleController.findArticlesById.bind(this.articleController)
    );
  }
};

// src/app.ts
console.log("\u{1F680} ~ file: app.ts:12 ~ __dirname:", __dirname);
var App = class {
  constructor() {
    this.recipeRoutes = new RecipeRouter();
    this.articleRoutes = new ArticleRouter();
    this.app = (0, import_express3.default)();
    this.middlewaresInitialize();
    this.initializeRoutes();
    this.interceptionError();
    connect();
  }
  initializeRoutes() {
    this.app.use("/recipes", this.recipeRoutes.router);
    this.app.use("/articles", this.articleRoutes.router);
  }
  interceptionError() {
    this.app.use(errorMiddleware);
  }
  middlewaresInitialize() {
    this.app.use(import_express3.default.json());
    this.app.use((0, import_cors.default)());
    this.app.use(
      "/uploads",
      import_express3.default.static(import_node_path.default.join(__dirname, "tmp", "uploads"))
    );
    this.app.use(import_express3.default.urlencoded({ extended: true }));
  }
  listen() {
    this.app.listen(3333, () => console.log("server is running"));
  }
};

// src/main.ts
var app = new App();
app.listen();
