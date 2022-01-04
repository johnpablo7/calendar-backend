const express = require("express");
require("dotenv").config();

// Crear el servidor de express
const app = express();

// Directorio Público
app.use(express.static("public"));

// Rutas
app.use("/api/auth", require("./routes/auth"));
// app.get("/", (req, res) => {
//   // console.log("Se requiere el /");
//   res.json({
//     ok: true,
//   });
// });

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
