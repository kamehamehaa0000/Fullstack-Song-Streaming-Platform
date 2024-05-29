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
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})

const getPlaylistByID = asyncHandler(async (req, res) => {
  try {
    const { playlistID } = req.params
    const playlist = await Playlist.findOne({ _id: playlistID })
      .populate({
        path: 'songs',
        populate: {
          path: 'artist',
          select: ['username'],
          model: 'User',
        },
      })
      .populate('owner')
      .populate('collaborators')

    if (!playlist) {
      throw new ApiError(404, 'Playlist not found')
    }

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})

const getPlaylistByArtist = asyncHandler(async (req, res) => {
  try {
    const artistID = req.params.artistID
    const artist = await User.findOne({ _id: artistID })
    if (!artist) {
      throw new ApiError(401, 'Invalid artist ')
    }

    const playlists = await Playlist.find({ owner: artistID }).populate('songs')

    if (!playlists) {
      throw new ApiError(404, 'Playlist Not Found.')
    }

    return res.status(200).json(new ApiResponse(200, { data: playlists }))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
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
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})
const addSong = asyncHandler(async (req, res) => {
  try {
    const { songID, playlistID } = req.body
    const currentUser = req.user

    const playlist = await Playlist.findOne({ _id: playlistID }).populate(
      'songs'
    )
    if (!playlist) {
      throw new ApiError(404, 'Playlist Not Found.')
    }

    if (
      playlist.owner.toString() !== currentUser._id.toString() &&
      !playlist.collaborators.some(
        (collab) => collab.toString() === currentUser._id.toString()
      )
    ) {
      throw new ApiError(
        403,
        'You are not the owner or a collaborator of the playlist'
      )
    }

    const song = await Song.findOne({ _id: songID })
    if (!song) {
      throw new ApiError(404, 'Song does not exist or found')
    }

    if (
      playlist.songs.some(
        (existingSong) => existingSong._id.toString() === song._id.toString()
      )
    ) {
      throw new ApiError(400, 'Song is already in the playlist')
    }

    playlist.songs.push(song._id)
    await playlist.save()

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
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
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})

const removeSong = asyncHandler(async (req, res) => {
  try {
    const { songID, playlistID } = req.body
    console.log(songID, playlistID)

    const currentUser = req.user
    const playlist = await Playlist.findOne({ _id: playlistID })
    if (!playlist) {
      console.log('playlist not found')
      throw new ApiError(404, 'Playlist Not Found.')
    }

    if (
      playlist.owner.toString() !== currentUser._id.toString() &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      throw new ApiError(
        403,
        'You are not the owner or a collaborator of the playlist'
      )
    }

    // Convert songID to string to ensure correct comparison
    const songIDStr = songID.toString()
    const songIndex = playlist.songs.indexOf(songIDStr)
    console.log(songIndex)

    if (songIndex > -1) {
      playlist.songs.splice(songIndex, 1)
      await playlist.save()

      // Populate the songs and artist fields
      await playlist.populate({
        path: 'songs',
        populate: { path: 'artist', select: ['username'] },
      })

      return res.status(200).json(new ApiResponse(200, playlist))
    } else {
      console.log('song not found')
      throw new ApiError(404, 'Song not found in the playlist')
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})

const updatePlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistID } = req.params
    const { name, description } = req.body
    const currentUser = req.user

    const playlist = await Playlist.findOne({ _id: playlistID })
    if (!playlist) {
      throw new ApiError(404, 'Playlist Not Found.')
    }

    if (
      playlist.owner.toString() !== currentUser._id.toString() &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      throw new ApiError(
        403,
        'You are not the owner or a collaborator of the playlist'
      )
    }

    if (name) {
      playlist.name = name
    }
    if (description) {
      playlist.description = description
    }
    await playlist.save()

    return res.status(200).json(new ApiResponse(200, playlist))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})

const deletePlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistID } = req.params
    const currentUser = req.user

    const playlist = await Playlist.findOne({ _id: playlistID })
    if (!playlist) {
      throw new ApiError(404, 'Playlist Not Found.')
    }

    if (
      playlist.owner.toString() !== currentUser._id.toString() &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      throw new ApiError(
        403,
        'You are not the owner or a collaborator of the playlist'
      )
    }

    await Playlist.deleteOne({ _id: playlistID })

    return res
      .status(200)
      .json(new ApiResponse(200, 'Playlist deleted successfully'))
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, { error: error.message }))
  }
})

export {
  addSong,
  removeSong,
  updatePlaylist,
  deletePlaylist,
  getPlaylistByArtist,
  getPlaylistByID,
  getPlaylistByUser,
  createPlaylist,
  getAllPlaylist,
}
//remove from playlist
// update playlist [ name and discription]
