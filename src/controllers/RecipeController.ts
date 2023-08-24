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
}
export { RecipeController }