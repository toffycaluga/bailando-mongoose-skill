import { Router } from "express";

import {
  crearPlaylist,
  obtenerPlaylists,
  obtenerPlaylistPorId,
  actualizarPlaylist,
  eliminarPlaylist,
} from "../controllers/playlistController.js";

const router = Router();

router.post("/", crearPlaylist);
router.get("/", obtenerPlaylists);
router.get("/:id", obtenerPlaylistPorId);
router.put("/:id", actualizarPlaylist);
router.delete("/:id", eliminarPlaylist);

export default router;