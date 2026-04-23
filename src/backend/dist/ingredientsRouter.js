"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// @ts-ignore
const ingredientsMockdaten_ts_1 = require("./ingredientsMockdaten.ts"); // Schade aber muss --> das .ts
let ingredient = ingredientsMockdaten_ts_1.ingredientsMockdaten;
const router = (0, express_1.Router)();
// GET /api/ingredient -> all ingredients
router.get("/", (req, res) => {
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
exports.default = router; //NICHTS NACH HIER SCHREIBEN
