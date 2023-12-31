import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../entities/Recipe';
import { RecipeUseCase } from '../useCase/RecipeUseCase';
const { uploadFile } = require('../infra/storage.ts');
class RecipeController {
    constructor(private recipeUseCase: RecipeUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let recipeData: Recipe = req.body;
        const file = req.file as any;

        try {
            if (file) {
                const arquivo = await uploadFile(
                    `imagens/${file.originalname}`,
                    file.buffer,
                    file.mimetype
                )
                recipeData = {
                    ...recipeData,
                    image: arquivo.url
                };

                console.log(recipeData);
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
        const { id } = req.query;
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