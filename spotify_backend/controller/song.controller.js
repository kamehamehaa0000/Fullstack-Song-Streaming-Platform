import { Song } from '../models/song.model.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../util/asyncHandler.js'
import { ApiError } from '../util/ApiError.js'
import { ApiResponse } from '../util/ApiResponse.js'
import { uploadOnCloudinary } from '../util/cloudinary.js'

const createNewSong = asyncHandler(async (req, res) => {
  const { name } = req.body
  const artist = req.user.id // from passport.authenticate
  try {
    //checking if file is recieved from multer or not
    let thumbnailLocalPath
    if (
      req.files &&
      Array.isArray(req.files.thumbnail) &&
      req.files.thumbnail.length > 0
    ) {
      thumbnailLocalPath = req.files?.thumbnail[0]?.path
    }

    //uploading on Cloudinary
    // const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    let trackLocalPath
    if (
      req.files &&
      Array.isArray(req.files.track) &&
      req.files.track.length > 0
    ) {
      trackLocalPath = req.files?.track[0]?.path
    }
    console.log(trackLocalPath)
    console.log(thumbnailLocalPath)
    //uploading on Cloudinary
    // const track = await uploadOnCloudinary(trackLocalPath)
    // console.log(track)
    let track = await uploadOnCloudinary(trackLocalPath).catch((error) => {
      console.log(error)
    })
    console.log(track)
    let thumbnail = await uploadOnCloudinary(thumbnailLocalPath).catch(
      (error) => {
        console.log(error)
      }
    )

    if (!thumbnail || !track || !name) {
      throw new ApiError(401, 'Insufficient data to create a song.')
    }
    console.log(track.url)
    console.log(thumbnail.url)
    const createdSong = await Song.create({
      name,
      thumbnail: thumbnail.url,
      track: track.url,
      artist,
      duration: track.duration,
    })
    console.log(createdSong)
    if (!createdSong) {
      throw new ApiError(402, 'Error creating the song.')
    }

    return res.status(200).json(new ApiResponse(200, { createdSong }))
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(error.statusCode, {
        error: error.message,
      })
    )
  }
})

const getMysongs = asyncHandler(async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.user._id }).populate({
      path: 'artist',
      select: 'username firstName lastName ',
    })

    return res.status(200).json(new ApiResponse(200, { data: songs }))
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json(new ApiResponse(500, { error: 'Error during fetching the songs.' }))
  }
})

const getSongByArtist = asyncHandler(async (req, res) => {
  try {
    const { artistID } = req.params
    const artist = await User.findOne({ _id: artistID })
    if (!artist) {
      throw new ApiError(401, 'Invalid Artist ID')
    }
    const songs = await Song.find({ artist: artistID })
    if (!songs) {
      throw new ApiError(404, 'Songs not found')
    }
    return res.status(200).json(new ApiResponse(200, { data: songs }))
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, { error: 'Error during fetching the songs.' }))
  }
})

const getSongBySongName = asyncHandler(async (req, res) => {
  try {
    const { songname } = req.params
    if (!songname) {
      throw new ApiError(400, 'Song Name is required.')
    }
    const songs = await Song.find({
      name: { $regex: new RegExp(songname, 'i') }, // pattern matching instead of direact matching
    })
    if (!songs) {
      throw new ApiError(404, 'Songs not found.')
    }
    return res.status(200).json(new ApiResponse(200, { data: songs }))
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error during fetching the songs.' })
  }
})

const getAllSongs = asyncHandler(async (req, res) => {
  try {
    const songs = await Song.find().populate({
      path: 'artist',
      select: 'username firstName lastName ',
    })
    return res.status(200).json(new ApiResponse(200, { data: songs }))
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json(new ApiResponse(500, { error: 'Error during fetching the songs.' }))
  }
})

export {
  getMysongs,
  getSongByArtist,
  getSongBySongName,
  createNewSong,
  getAllSongs,
}
