import express from "express";
import path from "path";
import foodRouter from "./foodRouter";
import ingredientsRouter from "./ingredientsRouter";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// static files for frontend HTML
const publicPath = path.join(__dirname, "../../public");
app.use(express.static(publicPath));

app.use(express.json());

// simple API routes
app.use("/api/food", foodRouter);
app.use("/api/ingredients", ingredientsRouter);



app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});