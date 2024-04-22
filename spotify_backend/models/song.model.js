import mongoose from 'mongoose'

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    track: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Song = mongoose.model('Song', songSchema)
