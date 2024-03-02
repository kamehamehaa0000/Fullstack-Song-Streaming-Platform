import { Song } from '../models/song.model.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../util/asyncHandler.js'
import { ApiError } from '../util/ApiError.js'
import { ApiResponse } from '../util/ApiResponse.js'

const createNewSong = asyncHandler(async (req, res) => {
  const { name, thumbnail, track } = req.body
  const artist = req.user.id // from passport.authenticate

  try {
    if (!name || !thumbnail || !track) {
      throw new ApiError(401, 'Insufficient details to create a song.')
    }

    const createdSong = await Song.create({ name, thumbnail, track, artist })

    if (!createdSong) {
      throw new ApiError(402, 'Error creating the song.')
    }

    return res.status(200).json(new ApiResponse(200, { createdSong }))
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(error.statusCode, {
        error: 'Error during creating the song.',
      })
    )
  }
})

const getMysongs = asyncHandler(async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.user._id })
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

export { getMysongs, getSongByArtist, getSongBySongName, createNewSong }
