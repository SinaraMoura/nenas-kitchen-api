import { Recipe } from '../entities/Recipe';
import { HttpException } from '../interfaces/HttpException';
import { RecipeRepository } from '../repositories/RecipeRepositoty';

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
        if (!recipeData.category) {
            throw new HttpException(400, 'Category is required');
        }
        if (!recipeData.image) {
            throw new HttpException(400, 'Image is required');
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

    async findRecipesByCategory(category: string) {
        if (!category) throw new HttpException(400, 'Category is required');
        const result = await this.recipeRepository.findRecipesByCategory(category);
        return result;
    }

    async findRecipesByName(name: string) {
        if (!name) throw new HttpException(400, 'Name is required');
        const result = await this.recipeRepository.findRecipesByName(name);
        return result;
    }

    async findRecipesByDifficylty(name: string) {
        if (!name) throw new HttpException(400, 'Name is required');
        const result = await this.recipeRepository.findRecipesByDifficulty(name);
        return result;
    }

    async updateRecipes(id: string, recipeData: Recipe) {
        const recipe = await this.recipeRepository.findRecipesById(id);
        if (!recipe) throw new HttpException(400, 'Recipe not found');

        const result = await this.recipeRepository.updateRecipes(id, recipeData);
        return result;
    }

    async deleteRecipes(id: string) {
        const recipe = await this.recipeRepository.findRecipesById(id);
        if (!recipe) throw new HttpException(400, 'Recipe not found');

        const result = await this.recipeRepository.deleteRecipes(id);
        return result;
    }

}
export { RecipeUseCase }