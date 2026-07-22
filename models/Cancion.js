import mongoose from "mongoose";

const cancionSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título de la canción es obligatorio"],
      minlength: [2, "El título debe tener al menos 6 caracteres"],
      maxlength: [255, "El título no puede superar los 255 caracteres"],
      trim: true,
    },

    artista: {
      type: String,
      required: [true, "El artista es obligatorio"],
      minlength: [2, "El artista debe tener al menos 10 caracteres"],
      maxlength: [255, "El artista no puede superar los 255 caracteres"],
      trim: true,
    },

    anioLanzamiento: {
      type: Number,
      required: [true, "El año de lanzamiento es obligatorio"],
      min: [1000, "El año de lanzamiento debe tener exactamente 4 dígitos"],
      max: [9999, "El año de lanzamiento debe tener exactamente 4 dígitos"],
    },

    genero: {
      type: String,
      required: [true, "El género musical es obligatorio"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cancion = mongoose.model("Cancion", cancionSchema);

export default Cancion;