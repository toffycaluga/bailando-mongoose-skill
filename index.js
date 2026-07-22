import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";


import connectDatabase from "./config/database.js";
import cancionRoutes from "./routes/cancionRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js"


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).json({
    mensaje: "API de música funcionando correctamente",
  });
});

app.use("/canciones", cancionRoutes);
app.use("/playlists",playlistRoutes);

app.use((_req, res) => {
  return res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
};

startServer();