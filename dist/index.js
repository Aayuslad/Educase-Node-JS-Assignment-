"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolRouter_1 = __importDefault(require("./router/schoolRouter"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Server is up and running 🔥");
});
app.use("/", schoolRouter_1.default);
app.listen(8080, () => {
    console.log("Example app listening on port 8080!");
});
