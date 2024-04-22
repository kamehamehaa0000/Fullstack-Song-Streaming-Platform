import { Router } from 'express'
import passport from 'passport'
import {
  getMysongs,
  getSongByArtist,
  getSongBySongName,
  createNewSong,
  getAllSongs,
} from '../controller/song.controller.js'
const router = Router()
import { upload } from '../middlewares/multer.middleware.js'
router.route('/create').post(
  upload.fields([
    { name: 'track', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  passport.authenticate('jwt', { session: false }),
  createNewSong
)

router
  .route('/get/mysongs')
  .get(passport.authenticate('jwt', { session: false }), getMysongs)

router
  .route('/get/artist/:artistID')
  .get(passport.authenticate('jwt', { session: false }), getSongByArtist)

router
  .route('/get/song/:songname')
  .get(passport.authenticate('jwt', { session: false }), getSongBySongName)

router.route('/get/allsongs').get(getAllSongs)
export default router
