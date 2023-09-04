import mongoose from 'mongoose';
import { Recipe } from '../entities/Recipe';
import { RecipeRepository } from './RecipeRepositoty';
import { v4 as uuidv4 } from 'uuid';
const recipeSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: new mongoose.Types.ObjectId().toString(),
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
        default: Date.now,
    },
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

class RecipeRepositoryMongoose implements RecipeRepository {
    async addRecipe(recipe: Recipe): Promise<Recipe> {
        recipe._id = uuidv4()
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

    async findRecipesByCategory(category: string): Promise<Recipe[]> {
        const findRecipe = await RecipeModel.find({ category }).exec();
        return findRecipe.map((recipe) => recipe.toObject());
    }

    async findRecipesByName(name: string): Promise<Recipe[]> {
        const findRecipe = await RecipeModel.find({
            title: {
                $regex: name,
                $options: 'i'
            }
        }).exec();
        return findRecipe.map((recipe) => recipe.toObject());
    }
    async findRecipesByDifficulty(name: string): Promise<Recipe[]> {
        const findRecipe = await RecipeModel.find({
            difficulty: {
                $regex: name,
                $options: 'i'
            }
        }).exec();
        return findRecipe.map((recipe) => recipe.toObject());
    }

    async updateRecipes(title: string, preparation: string[]): Promise<any> {
        const updateRecipe = await RecipeModel.updateOne({ title, preparation }).exec();
        return updateRecipe;
    }

    async deleteRecipes(id: string): Promise<any> {
        const deleteRecipe = await RecipeModel.deleteOne({ _id: id }).exec();
        return deleteRecipe;
    }

}
export { RecipeRepositoryMongoose };

