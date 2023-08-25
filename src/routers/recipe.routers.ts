import { Router } from "express";
import { RecipeController } from "../controllers/RecipeController";
import { RecipeRepositoryMongoose } from "../repositories/RecipeRepositoryMongoose";
import { RecipeUseCase } from "../useCase/RecipeUseCase"

class RecipeRouter {
    public router: Router;
    private recipeController: RecipeController;
    constructor() {
        this.router = Router();
        const recipeRepository = new RecipeRepositoryMongoose();
        const recipeUseCase = new RecipeUseCase(recipeRepository);
        this.recipeController = new RecipeController(recipeUseCase);
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(
            '/',
            this.recipeController.create.bind(this.recipeController)
        );
        this.router.get(
            '/list',
            this.recipeController.findAllRecipes.bind(this.recipeController)
        );
        this.router.get(
            '/id/:id',
            this.recipeController.findRecipesById.bind(this.recipeController)
        )
        this.router.get(
            '/category/:category',
            this.recipeController.findRecipesByCategory.bind(this.recipeController)
        )
        this.router.get(
            '/title',
            this.recipeController.findRecipesByName.bind(this.recipeController)
        )
        this.router.get(
            '/difficulty',
            this.recipeController.findRecipesByDifficulty.bind(this.recipeController)
        )
    }
}

export { RecipeRouter }