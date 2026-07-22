import mongoose from "mongoose";
import Playlist from "../models/Playlist.js";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const obtenerErroresValidacion = (error) => {
  return Object.values(error.errors).map(
    (validationError) => validationError.message
  );
};

export const crearPlaylist = async (req, res) => {
  try {
    const nuevaPlaylist = await Playlist.create(req.body);

    return res.status(201).json({
      mensaje: "Playlist creada correctamente",
      playlist: nuevaPlaylist,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Los datos enviados no son válidos",
        errores: obtenerErroresValidacion(error),
      });
    }

    console.error("Error al crear la playlist:", error);

    return res.status(500).json({
      mensaje: "Error interno al crear la playlist",
    });
  }
};

export const obtenerPlaylists = async (_req, res) => {
  try {
    const playlists = await Playlist.find().sort({ createdAt: -1 });

    return res.status(200).json({
      cantidad: playlists.length,
      playlists,
    });
  } catch (error) {
    console.error("Error al obtener las playlists:", error);

    return res.status(500).json({
      mensaje: "Error interno al obtener las playlists",
    });
  }
};

export const obtenerPlaylistPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El ID proporcionado no es válido",
      });
    }

    const playlist = await Playlist.findById(id).populate("canciones");

    if (!playlist) {
      return res.status(404).json({
        mensaje: "Playlist no encontrada",
      });
    }

    return res.status(200).json({
      playlist,
    });
  } catch (error) {
    console.error("Error al obtener la playlist:", error);

    return res.status(500).json({
      mensaje: "Error interno al obtener la playlist",
    });
  }
};

export const actualizarPlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El ID proporcionado no es válido",
      });
    }

    const playlistActualizada = await Playlist.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("canciones");

    if (!playlistActualizada) {
      return res.status(404).json({
        mensaje: "Playlist no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Playlist actualizada correctamente",
      playlist: playlistActualizada,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Los datos enviados no son válidos",
        errores: obtenerErroresValidacion(error),
      });
    }

    console.error("Error al actualizar la playlist:", error);

    return res.status(500).json({
      mensaje: "Error interno al actualizar la playlist",
    });
  }
};

export const eliminarPlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "El ID proporcionado no es válido",
      });
    }

    const playlistEliminada = await Playlist.findByIdAndDelete(id);

    if (!playlistEliminada) {
      return res.status(404).json({
        mensaje: "Playlist no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Playlist eliminada correctamente",
      playlist: playlistEliminada,
    });
  } catch (error) {
    console.error("Error al eliminar la playlist:", error);

    return res.status(500).json({
      mensaje: "Error interno al eliminar la playlist",
    });
  }
};