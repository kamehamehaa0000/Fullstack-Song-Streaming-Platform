import { Router } from 'express'
import passport from 'passport'
import {
  addSong,
  getPlaylistByArtist,
  getPlaylistByID,
  createPlaylist,
  getAllPlaylist,
  getPlaylistByUser,
} from '../controller/playlist.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router
  .route('/create')
  .post(
    upload.single('thumbnail'),
    passport.authenticate('jwt', { session: false }),
    createPlaylist
  )

router
  .route('/get/playlist/:playlistID')
  .get(passport.authenticate('jwt', { session: false }), getPlaylistByID)

router
  .route('/get/artist/:artistID')
  .get(passport.authenticate('jwt', { session: false }), getPlaylistByArtist)

router
  .route('/add/song')
  .post(passport.authenticate('jwt', { session: false }), addSong)

router.route('/getall').get(getAllPlaylist)
router
  .route('/myplaylists')
  .get(passport.authenticate('jwt', { session: false }), getPlaylistByUser)
export default router
