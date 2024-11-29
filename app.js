require('dotenv').config();
const http = require("http");
const express = require("express");
const ConnectionDB = require("./App/Database/connectionDB");
const controllerCad = require("./App/controllers/controllerCheckPaciente");
const datesPacientes = require("./App/controllers/controllerDates");
const app = express();

app.use(express.json());

app.post("/api/user/Dates", datesPacientes.dates)
app.post("/api/user/checkcpf", controllerCad.verifyCad)
app.get("/", (req, res) => {
    res.send("Requisição recebida");
});

const PORT = process.env.PORT || 3000;

app.listen( PORT , () => console.log(`Servidor rodando local na porta `));