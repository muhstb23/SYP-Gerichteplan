import { Router, Request, Response } from "express";

import {Food} from "./models";
// @ts-ignore
import {foodMockDaten} from "./foodMockdaten.ts"; // Schade aber muss --> das .ts

let food:Food[] = foodMockDaten;

const router = Router();

// GET /api/food -> all food
router.get("/", (req: Request, res: Response) => {
    console.log(food); // undefined - foodMockdaten.ts fehlende "" für name etc.
    console.log("test"); // kommt in konsole
    res.send(food);
});

export default router; //NICHTS NACH HIER SCHREIBEN