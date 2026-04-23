import express from "express";
import path from "path";
// import { fileURLToPath } from "url";
import playersRouter from "./players";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// static files for frontend HTML
const publicPath = path.join(__dirname, "../../public");
app.use(express.static(publicPath));

app.use(express.json());

// simple API routes
app.use("/api/players", playersRouter);

app.get("/new", (req, res) =>{
    res.send("message from route new");
})

app.get("/htl", (req, res) =>{
    res.send("Ich bin ein Schüler an der HTL Kaindorf");
})


app.get("/noah", (req, res) =>{
    res.send("message from noah!");
})

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});