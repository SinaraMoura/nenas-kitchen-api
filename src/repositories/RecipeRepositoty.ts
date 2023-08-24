import { Recipe } from "../entities/Recipe";

export interface RecipeRepository {
    addRecipe(recipe: Recipe): Promise<Recipe>
}
