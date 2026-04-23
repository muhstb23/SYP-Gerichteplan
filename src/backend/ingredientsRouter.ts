import { Router, Request, Response } from "express";

import {Ingredient} from "./models";
// @ts-ignore
import {ingredientsMockdaten} from "./ingredientsMockdaten.ts"; // Schade aber muss --> das .ts

let ingredient:Ingredient[] = ingredientsMockdaten;

const router = Router();

// GET /api/ingredient -> all ingredients
router.get("/", (req: Request, res: Response) => {
    console.log(ingredient); // undefined
    console.log("test - ingredients"); // kommt in konsole
    res.send(ingredient);
});

router.put("/", (req, res) => {
    const { name, available } = req.body;

    // Index über name finden
    const index = ingredient.findIndex(i => i.name === name);

    if (index === -1) {
        return res.status(404).json({ message: "Ingredient not found" });
    }

    // Update
    ingredient[index] = {
        ...ingredient[index],
        ...(available !== undefined && { available })
    };

    return res.status(200).json(ingredient[index]);
});

export default router; //NICHTS NACH HIER SCHREIBEN