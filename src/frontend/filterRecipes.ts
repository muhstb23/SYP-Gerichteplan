import {Food, Ingredient} from "./models";
import {RecipeFilters} from "./recipeFilters";

export function filterRecipes(dishes: Food[], filters: RecipeFilters, ingredients: Ingredient[]) {
     return dishes.filter(dish => {
         let ok = true;

         if (filters.maxIngredients !== null) {
                     ok = ok && dish.zutaten.length <= filters.maxIngredients;
         }

         return ok;
     })
}