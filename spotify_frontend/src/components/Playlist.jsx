import React, { useState, useEffect } from 'react'
import SinglePlaylistView from './shared/SinglePlaylistView'
import { makeAuthenticatedGETrequest } from '../utils/apiCall'
import { useParams } from 'react-router'
const Playlist = ({ token }) => {
  const { playlistID } = useParams()
  const [refresh, setRefresh] = useState(0)
  const [playlistData, setPlaylistData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await makeAuthenticatedGETrequest(
        `/playlist/get/playlist/${playlistID}`,
        token
      )
      setPlaylistData(response.data)
    }
    fetchData()
  }, [playlistID, refresh])

  return (
    <div className="py-20 md:px-10 text-white">
      <SinglePlaylistView
        data={playlistData}
        token={token}
        refreshPlaylist={setRefresh}
      />
    </div>
  )
}

export default Playlist
