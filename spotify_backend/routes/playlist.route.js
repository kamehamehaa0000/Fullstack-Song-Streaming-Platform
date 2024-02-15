import express from 'express'
import passport from 'passport'
import { Playlist } from '../models/playlist.model.js'
import { User } from '../models/user.model.js'
import { Song } from '../models/song.model.js'
const router = express.Router()

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user
      const { name, thumbnail, songs } = req.body

      if (!name || !thumbnail || !songs) {
        return res.status(400).json({ error: 'Insufficient data to add song' })
      }

      const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
      }

      const playlist = await Playlist.create(playlistData)

      if (!playlist) {
        return res
          .status(500)
          .json({ error: 'Error occurred during making playlist' })
      }

      return res.status(200).json(playlist)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/get/playlist/:playlistID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { playlistID } = req.params
      const playlist = await Playlist.findOne({ _id: playlistID })

      if (!playlist) {
        return res.status(404).json({ error: 'No playlist found' })
      }

      return res.status(200).json(playlist)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
)
router.get(
  '/get/artist/:artistID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const artistID = req.params.artistID
      const artist = await User.findOne({ _id: artistID })
      if (!artist) {
        return res.status(404).json({ error: 'Invalid artist ID' })
      }

      const playlists = await Playlist.find({ owner: artistID })

      if (!playlists) {
        return res.status(404).json({ error: 'No playlist found' })
      }

      return res.status(200).json({ data: playlists })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
)
router.post(
  '/add/song',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { songID, playlistID } = req.body
      const currentUser = req.user
      const playlist = await Playlist.findOne({ _id: playlistID })
      if (!playlist) {
        return res.status(404).json({ error: ' playlist does not exists' })
      }
      //check if current user is a owner or collaborator of playlist
      if (
        playlist.owner !== currentUser._id &&
        playlist.collaborators.includes(currentUser._id)
      ) {
        return res.status(400).json({ error: 'Not an owner or collaborator' })
      }
      //check if song is valid or not
      const song = await Song.findOne({ _id: songID })
      if (!song) {
        return res.status(304).json({ error: 'Invalid song' })
      }
      //adding song
      playlist.songs.push(songID)
      await playlist.save()

      return res.status(200).json(playlist)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
)

export default router
