import { Recipe } from "../entities/Recipe";

export interface RecipeRepository {
    addRecipe(recipe: Recipe): Promise<Recipe>
    findAllRecipe(): Promise<Recipe[]>
    findRecipesById(id: string): Promise<Recipe | undefined>
}
