export function filterRecipes(dishes, filters, ingredients) {
    return dishes.filter(dish => {
        let ok = true;
        if (filters.maxIngredients !== null) {
            ok = ok && dish.zutaten.length <= filters.maxIngredients;
        }
        return ok;
    });
}
