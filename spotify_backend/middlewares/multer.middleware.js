import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/temp')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})
export const upload = multer({
  storage: storage,
})

const songUpload = multer({ storage }).fields([
  { name: 'track', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
])
export { songUpload }
