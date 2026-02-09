import app from "./app.js"; // 👈 IMPORTANTE: .js por usar ESM

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
