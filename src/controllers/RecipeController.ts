import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../entities/Recipe';
import { RecipeUseCase } from '../useCase/RecipeUseCase';

class RecipeController {
    constructor(private recipeUseCase: RecipeUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let recipeData: Recipe = req.body;
        try {
            await this.recipeUseCase.create(recipeData);
            return res.status(201).json({ message: "Receita adicionada com sucesso" })
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
}
export { RecipeController }