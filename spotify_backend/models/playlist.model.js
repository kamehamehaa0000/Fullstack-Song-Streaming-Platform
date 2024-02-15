import mongoose from 'mongoose'

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

export const Playlist = mongoose.model('Playlist', playlistSchema)
