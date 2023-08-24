import axios from 'axios';
import { Recipe } from '../entities/Recipe';
import { HttpException } from '../interfaces/HttpException';
import { RecipeRepository } from '../repositories/RecipeRepositoty';
import { RecipeRepositoryMongoose } from '../repositories/RecipeRepositoryMongoose';

class RecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) { }

    async create(recipeData: Recipe) {
        if (!recipeData.title) {
            throw new HttpException(400, 'Title is required');
        }
        if (!recipeData.preparation) {
            throw new HttpException(400, 'Preparation is required');
        }
        if (!recipeData.ingredients) {
            throw new HttpException(400, 'Ingredients is required');
        }

        recipeData = {
            ...recipeData
        }
        const result = await this.recipeRepository.addRecipe(recipeData);
        return result;
    }

    async findAllRecipes() {
        const result = await this.recipeRepository.findAllRecipe();
        return result;
    }

    async findRecipesById(id: string) {
        if (!id) throw new HttpException(400, 'Id is required');
        const result = await this.recipeRepository.findRecipesById(id);
        return result;
    }

}
export { RecipeUseCase }