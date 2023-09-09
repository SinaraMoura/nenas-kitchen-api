import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../entities/Recipe';
import { RecipeUseCase } from '../useCase/RecipeUseCase';

class RecipeController {
    constructor(private recipeUseCase: RecipeUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let recipeData: Recipe = req.body;
        const files = req.files as any;
        console.log("🚀 ~ file: RecipeController.ts:14 ~ RecipeController ~ create ~ files:", files)

        try {
            if (files) {
                const image = files.image[0];


                recipeData = {
                    ...recipeData,
                    image: image.filename
                };

            }
            await this.recipeUseCase.create(recipeData);
            return res.status(201).json({ message: "Receita adicionada com sucesso." })
        } catch (error) {
            next(error)
        }
    }

    async findAllRecipes(req: Request, res: Response, next: NextFunction) {
        try {
            const recipes = await this.recipeUseCase.findAllRecipes();
            return res.status(200).json(recipes)
        } catch (error) {
            next(error)
        }
    }

    async findRecipesById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const recipe = await this.recipeUseCase.findRecipesById(String(id));
            return res.status(200).json(recipe);
        } catch (error) {
            next(error)
        }
    }

    async findRecipesByCategory(req: Request, res: Response, next: NextFunction) {
        const { category } = req.params;
        try {
            const recipe = await this.recipeUseCase.findRecipesByCategory(category);
            return res.status(200).json(recipe);
        } catch (error) {
            next(error)
        }
    }

    async findRecipesByName(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;
        try {
            const recipe = await this.recipeUseCase.findRecipesByName(String(name));
            return res.status(200).json(recipe);
        } catch (error) {
            next(error)
        }
    }

    async findRecipesByDifficulty(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;
        try {
            const recipe = await this.recipeUseCase.findRecipesByDifficylty(String(name));
            return res.status(200).json(recipe);
        } catch (error) {
            next(error)
        }
    }

    async updateRecipes(req: Request, res: Response, next: NextFunction) {
        const { title, preparation } = req.body;
        const { id } = req.params;
        try {
            const recipe = await this.recipeUseCase.updateRecipes(id, title, preparation);
            return res.status(204).json(recipe);
        } catch (error) {
            next(error)
        }
    }

    async deleteRecipes(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const recipe = await this.recipeUseCase.deleteRecipes(id);
            return res.status(200).json(recipe);
        } catch (error) {
            next(error)
        }
    }
}
export { RecipeController }