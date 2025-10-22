const express = require("express");
const User = require("./user"); //importamos el modelo user que creamos en user.js

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint solicitado
app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

// Endpoint POST /api/echo
app.post("/api/echo", (req, res) => {
  const { message } = req.body;
  res.status(200).json({ message });
});

// Endpoint para crear usuarios(creamos y guardamos un usuario en la base de datos)
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para obtener usuarios
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Endpoint mínimo para pasar la prueba (TDD)
app.get("/api/greeting", (req, res) => {
  res.status(200).send("Greeting");
});

// Exportar la app para testing
module.exports = app;
