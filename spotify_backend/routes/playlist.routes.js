import { Router } from 'express'
import passport from 'passport'
import {
  addSong,
  getPlaylistByArtist,
  getPlaylistByID,
  createPlaylist,
} from '../controller/playlist.controller.js'
const router = Router()

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createPlaylist)

router
  .route('/get/playlist/:playlistID')
  .get(passport.authenticate('jwt', { session: false }), getPlaylistByID)

router
  .route('/get/artist/:artistID')
  .get(passport.authenticate('jwt', { session: false }), getPlaylistByArtist)

router
  .route('/add/song')
  .post(passport.authenticate('jwt', { session: false }), addSong)

export default router
