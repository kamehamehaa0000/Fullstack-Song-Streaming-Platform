import express from 'express'
import { Song } from '../models/song.model.js'
import passport from 'passport'
import { User } from '../models/user.model.js'
const router = express.Router()

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body
    const artist = req.user.id // from passport.authenticate

    try {
      if (!name || !thumbnail || !track) {
        throw new Error('Insufficient details to create a song.')
      }

      const createdSong = await Song.create({ name, thumbnail, track, artist })

      if (!createdSong) {
        throw new Error('Error creating the song.')
      }

      return res.status(200).json(createdSong)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error during creating the song.' })
    }
  }
)
router.get(
  '/get/mysongs',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const songs = await Song.find({ artist: req.user._id })
      return res.status(200).json({ data: songs })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error during fetching the songs.' })
    }
  }
)
router.get(
  '/get/artist/:artistID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { artistID } = req.params
      const artist = await User.findOne({ _id: artistID })
      if (!artist) {
        throw new Error('Invalid Artist ID')
      }
      const songs = await Song.find({ artist: artistID })
      return res.status(200).json({ data: songs })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error during fetching the songs.' })
    }
  }
)
router.get(
  '/get/song/:songname',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { songname } = req.params
      const songs = await Song.find({
        name: { $regex: new RegExp(songname, 'i') }, // pattern matching instead of direact matching
      })

      return res.status(200).json({ data: songs })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error during fetching the songs.' })
    }
  }
)
export default router
