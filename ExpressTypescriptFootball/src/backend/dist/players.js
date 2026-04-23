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
// hier bei der parameter Route zum testen
// localhost:3000/parameter?sort=alter&suche=messi
router.get("/msroute", (req, res) => {
    // rein holen des Parameters
    const sort = req.query.sort;
    const alter = req.query.alter;
    const name = req.query.name;
    console.log(`Am Backend kommt der Parameter für sort: ${sort} an `);
    console.log(alter);
    //players.sort((a, b) => a.lastname.localeCompare(b.lastname));
    if (sort === "des") {
        players.sort((a, b) => -1 * (a.age - b.age));
    }
    else {
        players.sort((a, b) => (a.age - b.age));
    }
    res.send(players);
});
// filter Route /filter?club=
// Achtung filter?club=Real+Madrid oder Real%20Madrid
router.get("/filter", (req, res) => {
    const club = req.query.club;
    console.log(club);
    const filteredPlayers = players.filter((p) => {
        return p.club == club;
    });
    res.send(filteredPlayers);
});
/* Parameter bei Routen: Paramsrouten
/1  such mir eine bestimmte Id

und query-Routen:

?sort=alter
?sort=alter&stadt=graz
*/
// einen bestimmten Spieler finden mit der id
// map und foreach (kein Return Array)
// filter (liefert 0,1, ...), find (liefert 1 oder undefined)
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const player = players.find(p => p.id === id);
    if (!player) {
        res.status(404).json({ message: `Spieler nicht gefunden mit ${id}` });
    }
    res.send(player);
});
router.get("/name/:sucheName", (req, res) => {
    const sucheName = req.params.sucheName;
    const player = players.find(p => p.lastname === sucheName);
    if (!player) {
        return res.status(404).send("Spielername nicht gefunden");
    }
    res.send(player);
});
// GET /api/players/club/:club  --> Spieler nach Verein
router.get("/club/:club", (req, res) => {
    const clubParam = req.params.club.toLowerCase();
    console.log("get:clubParmLow=", clubParam);
    const result = players.filter((p, index) => {
        console.log("filter:p.club=", p.club);
        console.log("filter:p.club.length=", p.club.length);
        console.log("filter:clubParam.length=", clubParam.length);
        if (p.club.toLowerCase().trim() === clubParam.trim()) {
            return p;
        }
    });
    console.log("get:club:Player", result);
    if (result.length === 0) {
        return res.status(404).send("Keine Spieler für diesen Verein gefunden.");
    }
    res.send(result);
});
// Post Route
let nextId = 3;
router.post("/", (req, res) => {
    console.log("post ", req.body);
    // destructuring = Aufteilen eines Objektes in sein Einzelteile
    const { firstname, lastname, club, age, country } = req.body;
    if (!firstname || !club) {
        return res.status(400).json({ message: "Ungültige Daten" });
    }
    const neuerSpieler = {
        id: ++nextId,
        firstname,
        lastname,
        club,
        age,
        country
    };
    // Vorhandene Spieler um den gültigen Spieler erweitern
    // Spieler geht normalerweise in die DB
    players = [...players, neuerSpieler];
    res.status(201).json("neuerSpieler");
});
// delete Route
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    let deleted = false;
    // console.log(players);
    // Beispiel: Löschen aus Datenbank
    if (id > 0) {
        const newPlayers = players.filter((p) => {
            return p.id != id;
        });
        deleted = true;
        players = [...newPlayers];
    }
    if (!deleted) {
        return res.status(404).json({ message: 'Item nicht gefunden bzw. unter 4' });
    }
    res.status(200).json({ message: 'Item gelöscht' });
});
// PUT /api/spieler/:id
/*
Vorteile:
nur Felder, die im Body sind, werden geändert
id bleibt unverändert
robust gegen fehlende Felder
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, club, age, country } = req.body;
    console.log(req.body);
    const index = players.findIndex((s) => s.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: `Spieler mit id ${id} nicht gefunden` });
    }
    // Eintrag aktualisieren
    players[index] = {
        ...players[index], // alte Werte behalten
        ...(firstname !== undefined && { firstname }),
        ...(club !== undefined && { club }),
        ...(lastname !== undefined && { lastname }),
        ...(age !== undefined && { age }),
    };
    return res.status(200).json(players[index]);
});
exports.default = router;
