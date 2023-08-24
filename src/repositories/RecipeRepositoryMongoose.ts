import mongoose from 'mongoose';
import { Recipe } from '../entities/Recipe';
import { RecipeRepository } from './RecipeRepositoty';

const recipeSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: new mongoose.Types.ObjectId().toString(),
    },
    title: String,
    ingredients: [String],
    duration: String,
    preparation: String,
    difficulty: String,
    date: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

class RecipeRepositoryMongoose implements RecipeRepository {
    async addRecipe(recipe: Recipe): Promise<Recipe> {
        const recipeModel = new RecipeModel(recipe);

        await recipeModel.save();
        return recipe;
    }

    async findAllRecipe(): Promise<Recipe[]> {
        const findRecipe = await RecipeModel.find().exec();
        return findRecipe.map((recipe) => recipe.toObject());
    }

    async findRecipesById(id: string): Promise<Recipe | undefined> {
        const findRecipe = await RecipeModel.findById({ _id: id }).exec();
        return findRecipe ? findRecipe.toObject() : undefined
    }

}
export { RecipeRepositoryMongoose };

