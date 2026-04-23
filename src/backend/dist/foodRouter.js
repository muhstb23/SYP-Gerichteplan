"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// @ts-ignore
const foodMockdaten_ts_1 = require("./foodMockdaten.ts"); // Schade aber muss --> das .ts
let food = foodMockdaten_ts_1.foodMockDaten;
const router = (0, express_1.Router)();
// GET /api/food -> all food
router.get("/", (req, res) => {
    console.log(food); // undefined - foodMockdaten.ts fehlende "" für name etc.
    console.log("test"); // kommt in konsole
    res.send(food);
});
exports.default = router; //NICHTS NACH HIER SCHREIBEN
