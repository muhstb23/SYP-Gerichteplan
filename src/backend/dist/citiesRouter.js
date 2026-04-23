"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mockdatenSpieler_1 = require("./mockdatenSpieler");
let players = mockdatenSpieler_1.players1;
const router = (0, express_1.Router)();
// GET /api/players  -> all players
router.get("/", (req, res) => {
    console.log(players);
    res.send(players);
});
exports.default = router; //NICHTS NACH HIER SCHREIBEN
