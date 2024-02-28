import { Router } from 'express'
import passport from 'passport'
import {
  getMysongs,
  getSongByArtist,
  getSongBySongName,
  createNewSong,
} from '../controller/song.controller.js'
const router = Router()

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createNewSong)

router
  .route('/get/mysongs')
  .get(passport.authenticate('jwt', { session: false }), getMysongs)

router
  .route('/get/artist/:artistID')
  .get(passport.authenticate('jwt', { session: false }), getSongByArtist)

router
  .route('/get/song/:songname')
  .get(passport.authenticate('jwt', { session: false }), getSongBySongName)

export default router
