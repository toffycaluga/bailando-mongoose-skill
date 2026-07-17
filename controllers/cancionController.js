import mongoose from "mongoose";
import Cancion from "../models/Cancion.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const obtenerErroresValidacion = (error) => {
  return Object.values(error.errors).map(
    (validationError) => validationError.message
  );
};

export const crearCancion = async (req, res) => {
  try {
    const nuevaCancion = await Cancion.create(req.body);

    return res.status(201).json({
      mensaje: "Canción creada correctamente",
      cancion: nuevaCancion,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Los datos enviados no son válidos",
        errores: obtenerErroresValidacion(error),
      });
    }

    console.error("Error al crear la canción:", error);

    return res.status(500).json({
      mensaje: "Error interno al crear la canción",
    });
  }
};

export const obtenerCanciones = async (_req, res) => {
  try {
    const canciones = await Cancion.find().sort({ createdAt: -1 });

    return res.status(200).json({
      cantidad: canciones.length,
      canciones,
    });
  } catch (error) {
    console.error("Error al obtener las canciones:", error);

    return res.status(500).json({
      mensaje: "Error interno al obtener las canciones",
    });
  }
};

export const obtenerCancionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El ID proporcionado no es válido",
      });
    }

    const cancion = await Cancion.findById(id);

    if (!cancion) {
      return res.status(404).json({
        mensaje: "Canción no encontrada",
      });
    }

    return res.status(200).json({
      cancion,
    });
  } catch (error) {
    console.error("Error al obtener la canción:", error);

    return res.status(500).json({
      mensaje: "Error interno al obtener la canción",
    });
  }
};

export const actualizarCancion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El ID proporcionado no es válido",
      });
    }

    const cancionActualizada = await Cancion.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cancionActualizada) {
      return res.status(404).json({
        mensaje: "Canción no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Canción actualizada correctamente",
      cancion: cancionActualizada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Los datos enviados no son válidos",
        errores: obtenerErroresValidacion(error),
      });
    }

    console.error("Error al actualizar la canción:", error);

    return res.status(500).json({
      mensaje: "Error interno al actualizar la canción",
    });
  }
};

export const eliminarCancion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El ID proporcionado no es válido",
      });
    }

    const cancionEliminada = await Cancion.findByIdAndDelete(id);

    if (!cancionEliminada) {
      return res.status(404).json({
        mensaje: "Canción no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Canción eliminada correctamente",
      cancion: cancionEliminada,
    });
  } catch (error) {
    console.error("Error al eliminar la canción:", error);

    return res.status(500).json({
      mensaje: "Error interno al eliminar la canción",
    });
  }
};