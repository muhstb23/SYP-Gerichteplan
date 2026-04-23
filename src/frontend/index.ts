// index.ts
// für interaktive index.html nötig (Cards erstellen und Zutaten ansehen)

import {Food, Ingredient} from "./models";
import {filterRecipes} from "./filterRecipes";
import {RecipeFilters} from "./recipeFilters";

document.addEventListener("DOMContentLoaded", async () => {
    const dishes: Food[] = await loadFood();
    const ingredients: Ingredient[] = await loadIngredients();

    showFood(dishes, ingredients);
    showIngredient(ingredients);

    // Dad Joke laden
    const joke = await loadDadJoke();
    const jokeDiv = document.getElementById("dadjoke");

    if (jokeDiv) {
        jokeDiv.textContent = joke;
    }
});

window.addEventListener("storage", async (event) => {
    if (event.key === "ingredientsUpdated") {
        console.log("Zutaten wurden geändert → aktualisiere Anzeige");

        const dishes: Food[] = await loadFood();
        const ingredients: Ingredient[] = await loadIngredients();

        const dishList = document.getElementById('dish-list');
        if (dishList) {
            dishList.innerHTML = "";
        }

        showFood(dishes, ingredients);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const dishes: Food[] = await loadFood();
    const ingredients: Ingredient[] = await loadIngredients();
    console.log(dishes);
    showFood(dishes, ingredients);
    showIngredient(ingredients);

    /*const countIngredients = document.getElementById("filter") as HTMLSelectElement;

    function applyFilters() {
         const filters: RecipeFilters = {
             maxIngredients: countIngredients.value ? Number(countIngredients.value) : null
         };

        const filtered = filterRecipes(dishes, filters, ingredients)
        showFood(filtered, ingredients)
    }

    countIngredients.addEventListener("change", applyFilters)*/
})

const loadFood = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/food');
        console.log(response.status);
        const food = await response.json()
        console.log(food);
        return food;
    }
    catch (e) {
        let err = e as Error;
        console.log(`${err.message}`);
    }
}

const loadIngredients = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/ingredients');
        console.log(response.status);
        const ingredients = await response.json()
        console.log(ingredients);
        return ingredients;
    }
    catch (e) {
        let err = e as Error;
        console.log(`${err.message}`);
    }
}

const showFood = (dishes:Food[], ingredients:Ingredient[]) => {
    const availableIngredients = ingredients;
    const dishList = document.getElementById('dish-list');

    dishes.sort((a, b) => a.name.localeCompare(b.name));

    dishes.forEach(dish => {

        const missingIngredients = dish.zutaten.filter(zutat => { //TODO
            const found = availableIngredients.find(i => i.name === zutat);
            return !found || !found.available;
        });
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `
      <div class="dish-name"><a href="${dish.link}" target="_blank" rel="noopener noreferrer">${dish.name}</a></div>
      <div class="dish-description">${dish.description}</div>
      <div class="dish-status ${missingIngredients.length === 0 ? 'available' : 'unavailable'}">
        ${missingIngredients.length === 0 ? 'Kann gekocht werden ✅' : 'Fehlende Zutaten ❌'}
      </div>
      ${missingIngredients.length > 0 ? '<ul>' + missingIngredients.map(i => `<li>${i}</li>`).join('') + '</ul>' : ''}
    `;
        try {
            if (dishList === null) {
                throw new Error('error');
            }
            dishList.appendChild(card);
        } catch (error) {
            console.log("likely null - dishList - index.ts")
        }

    })
}

const putIngredient = async (name:string, available:boolean):Promise<string> => {
    try {
        const res = await fetch(`http://localhost:3000/api/ingredients`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, available })
        });

        console.log(res.status);

        if (!res.ok) {
            throw new Error("Put fehlgeschlagen");
        }

        return "Put war erfolgreich";
    } catch (e) {
        let err = e as Error;
        return err.message;
    }
}

const showIngredient = (ingredients:Ingredient[]) => {
    const ingredientList = document.getElementById("ingredient-list") as HTMLDivElement;

    ingredientList.innerHTML = "";

    ingredients.sort((a, b) => a.name.localeCompare(b.name));

    const ul = document.createElement('ul');

    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        let available = "❌";

        if(ingredient.available) {
            available = "✅";
        }
        li.textContent = `${ingredient.name} ${available}`;
        li.addEventListener("click", async () => {
            console.log(`Vor dem Klick - ${ingredient.available}`);
            try {
                ingredient.available = !ingredient.available;

                await putIngredient(
                    ingredient.name,
                    ingredient.available
                );

                localStorage.setItem("ingredientsUpdated", Date.now().toString());

                ingredients = await loadIngredients();

            } catch (e) {
                console.log(e);
            }

            console.log(`Nach dem Klick - ${ingredient.available}`);

            showIngredient(ingredients);
        });
        ul.appendChild(li);

        try {
            if (ingredientList === null) {
                throw new Error('error');
            }
            ingredientList.appendChild(ul);
        } catch (error) {
            console.log("likely null - ingredientList - index.ts")
        }

    })
}


// Dad Jokes
const loadDadJoke = async () => {
    try {
        const response = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
            method: "GET",
            headers: {
                "X-Api-Key": "KubaMD3xCjmDFP5LVjAMoSagMj94C2mqclK9KPA0"
            }
        });

        if (!response.ok) {
            throw new Error("Fehler beim Laden des Witzes");
        }

        const data = await response.json();
        return data[0].joke;
    } catch (e) {
        console.log(e);
        return "Kein Witz gefunden 😢";
    }
};