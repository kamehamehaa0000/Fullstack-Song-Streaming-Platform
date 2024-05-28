import { Song } from '../models/song.model.js'
import { User } from '../models/user.model.js'
import { Playlist } from '../models/playlist.model.js'
import { asyncHandler } from '../util/asyncHandler.js'
import { ApiError } from '../util/ApiError.js'
import { ApiResponse } from '../util/ApiResponse.js'
import { uploadOnCloudinary } from '../util/cloudinary.js'
const createPlaylist = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user
    const thumbnail = req.file.path
    const { name, description } = req.body

    let thumbnailUrl = await uploadOnCloudinary(thumbnail).catch((error) => {
      console.log(error)
    })

    if (!thumbnail || !name) {
      throw new ApiError(401, 'Insufficient data to create a song.')
    }
    const playlistData = {
      name,
      thumbnail: thumbnailUrl.url,
      songs: [],
      description,
      owner: currentUser._id,
      collaborators: [],
    }

    const playlist = await Playlist.create(playlistData)
    console.log(playlist)
    if (!playlist) {
      throw new ApiError(401, 'Playlist creation failed')
    }

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error }))
  }
})

const getPlaylistByID = asyncHandler(async (req, res) => {
  try {
    const { playlistID } = req.params
    const playlist = await Playlist.findOne({ _id: playlistID })

    if (!playlist) {
      throw new ApiError(404, 'Playlist not found')
    }

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error }))
  }
})

const getPlaylistByArtist = asyncHandler(async (req, res) => {
  try {
    const artistID = req.params.artistID
    const artist = await User.findOne({ _id: artistID })
    if (!artist) {
      throw new ApiError(401, 'Invalid artist ')
    }

    const playlists = await Playlist.find({ owner: artistID })

    if (!playlists) {
      throw new ApiError(404, 'Playlist Not Found.')
    }

    return res.status(200).json(new ApiResponse(200, { data: playlists }))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error }))
  }
})
const getPlaylistByUser = asyncHandler(async (req, res) => {
  try {
    const userID = req.user._id
    const user = await User.findById(userID)
    console.log(user)
    if (!user) {
      console.log('user detail nhi mili')
      throw new ApiError(401, 'Invalid artist ')
    }

    const playlists = await Playlist.find({ owner: user._id }).populate('songs')

    if (!playlists) {
      if (playlists === null) {
        throw new ApiError(404, 'Playlist Not Found.')
      } else if (playlists.length === 0) {
        throw new ApiError(404, 'Playlist Not Created by user')
      }
    }

    return res.status(200).json(new ApiResponse(200, { data: playlists }))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error }))
  }
})
const addSong = asyncHandler(async (req, res) => {
  try {
    const { songID, playlistID } = req.body
    const currentUser = req.user
    const playlist = await Playlist.findOne({ _id: playlistID }).populate(
      'songs'
    )
    console.log(playlist)
    if (!playlist) {
      throw new ApiError(404, 'Playlist Not Found.')
    }
    //check if current user is a owner or collaborator of playlist

    if (
      playlist.owner !== currentUser._id &&
      playlist.collaborators.includes(currentUser._id)
    ) {
      throw new ApiError(
        402,
        'You are not a owner or collaborator of the playlist'
      )
    }

    //check if song is valid or not
    const song = await Song.findOne({ _id: songID })

    if (!song) {
      throw new ApiError(404, 'Song does not exist or found')
    }
    //adding song
    playlist.songs.push(songID)
    await playlist.save()

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error }))
  }
})
const getAllPlaylist = asyncHandler(async (req, res) => {
  try {
    const playlist = await Playlist.find()

    if (!playlist) {
      throw new ApiError(404, 'Playlists not found')
    }

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error }))
  }
})

export {
  addSong,
  getPlaylistByArtist,
  getPlaylistByID,
  getPlaylistByUser,
  createPlaylist,
  getAllPlaylist,
}
//remove from playlist
// update playlist [ name and discription]
