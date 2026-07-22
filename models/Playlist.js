import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la playlist es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [255, "El nombre no puede superar los 255 caracteres"],
      trim: true,
    },

    canciones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cancion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;