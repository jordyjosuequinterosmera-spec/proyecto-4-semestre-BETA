import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

export default app;
