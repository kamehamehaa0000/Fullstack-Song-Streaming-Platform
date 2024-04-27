import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedSongs: {
      //will later change to array
      type: String,
      default: '',
    },
    likedPlaylists: {
      //will later change to array
      type: String,
      default: '',
    },
    subscribedArtists: {
      //will later change to array
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)
