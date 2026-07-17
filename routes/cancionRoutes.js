import { Router } from "express";

import {
  crearCancion,
  obtenerCanciones,
  obtenerCancionPorId,
  actualizarCancion,
  eliminarCancion,
} from "../controllers/cancionController.js";

const router = Router();

router.post("/", crearCancion);
router.get("/", obtenerCanciones);
router.get("/:id", obtenerCancionPorId);
router.put("/:id", actualizarCancion);
router.delete("/:id", eliminarCancion);

export default router;