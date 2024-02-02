import { Recipe } from "../entities/Recipe";

export interface RecipeRepository {
    addRecipe(recipe: Recipe): Promise<Recipe>
    findAllRecipe(): Promise<Recipe[]>
    findRecipesById(id: string): Promise<Recipe | undefined>
    findRecipesByCategory(category: string): Promise<Recipe[]>
    findRecipesByName(name: string): Promise<Recipe[]>
    findRecipesByDifficulty(name: string): Promise<Recipe[]>
    updateRecipes(id: string, recipe: Recipe): Promise<Recipe | undefined>
    deleteRecipes(id: string): Promise<any>
}
