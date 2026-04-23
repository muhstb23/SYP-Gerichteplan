"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const foodRouter_1 = __importDefault(require("./foodRouter"));
const ingredientsRouter_1 = __importDefault(require("./ingredientsRouter"));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = (0, express_1.default)();
const PORT = 3000;
// static files for frontend HTML
const publicPath = path_1.default.join(__dirname, "../../public");
app.use(express_1.default.static(publicPath));
app.use(express_1.default.json());
// simple API routes
app.use("/api/food", foodRouter_1.default);
app.use("/api/ingredients", ingredientsRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
