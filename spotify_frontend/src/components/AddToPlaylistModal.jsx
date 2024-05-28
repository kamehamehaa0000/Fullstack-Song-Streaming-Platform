import React, { useEffect, useContext, useState } from 'react'
import {
  makeAuthenticatedGETrequest,
  makeAuthenticatedPOSTrequest,
} from '../utils/apiCall'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import addToPlaylistModalContext from '../components/contexts/addToPlaylistModalContext'
import { dotStream } from 'ldrs'
import currentSongContext from './contexts/songContext'

dotStream.register()

const AddToPlaylistModal = ({ token }) => {
  const { isOpenPlaylist, setIsOpenPlaylist, crntSongId } = useContext(
    addToPlaylistModalContext
  )
  const [loading, setLoading] = useState(false)
  const [playlistData, setPlaylistData] = useState([])
  const { currentSong } = useContext(currentSongContext)

  useEffect(() => {
    if (!isOpenPlaylist) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await makeAuthenticatedGETrequest(
          '/playlist/myplaylists',
          token
        )
        if (response) {
          setPlaylistData(response.data.data)
        }
      } catch (error) {
        toast.error('Failed to load playlists')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isOpenPlaylist, token])

  const handleAddToPlaylist = async (playlistId) => {
    const data = { songID: crntSongId, playlistID: playlistId }
    try {
      const res = await makeAuthenticatedPOSTrequest(
        '/playlist/add/song',
        data,
        token
      )
      if (res.success) {
        toast.success('Song Added to playlist Successfully')
      } else {
        toast.error('Song Not Added')
      }
    } catch (error) {
      toast.error('Failed to add song to playlist')
    }
  }

  const loadingAnimation = (
    <div className="flex flex-col m-4 rounded-md">
      <l-dot-stream size="80" speed="3" color="white" />
    </div>
  )

  return (
    <div className="z-[99]">
      {isOpenPlaylist && (
        <div className="fixed text-white top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
            onClick={() => setIsOpenPlaylist(false)}
          ></div>
          <div className="relative z-10">
            <div className="max-w-md mt-16 p-10 dark:border-2 bg-white dark:bg-zinc-950 shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
              <h1>Playlists</h1>
              {loading ? (
                <div className="flex justify-center mt-4">
                  {loadingAnimation}
                </div>
              ) : (
                playlistData.map((playlist, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 items-center my-4 bg-zinc-800 p-2 rounded-xl gap-4"
                  >
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.name}
                      className="w-[50px] col-span-1 h-[50px] object-cover object-center rounded-sm"
                    />
                    <div className="col-span-2 overflow-x-scroll flex flex-wrap text-center">
                      {playlist.name}
                    </div>
                    <button
                      onClick={() => handleAddToPlaylist(playlist._id)}
                      className="col-span-1 justify-self-end mr-2 w-[30px] h-[30px] bg-zinc-700 rounded-full"
                    >
                      +
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={800} />
    </div>
  )
}

export default AddToPlaylistModal
