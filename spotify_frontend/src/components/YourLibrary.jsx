import React, { useEffect, useState } from 'react'
import { makeAuthenticatedGETrequest } from '../utils/apiCall'
import Card from './shared/Card.jsx'
import { useNavigate } from 'react-router'
const YourLibrary = ({ token }) => {
  const [playlistData, setPlaylistData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await makeAuthenticatedGETrequest(
        '/playlist/myplaylists',
        token
      )
      setPlaylistData(response.data.data)
    }
    fetchData()
  }, [])
  const handleClick = (playlist) => {
    navigate(`/playlist/${playlist._id}`)
  }
  return (
    <div className="w-full h-full py-16 sm:px-6 text-white">
      <h1 className="text-xl lg:text-3xl md:px-4 py-5 my-3 font-semibold">
        Your Library
      </h1>
      <div className=" grid grid-cols-2 gap-2 md:px-4 lg:grid-cols-5 xl:grid-cols-8">
        {playlistData.map((playlist, index) => {
          return (
            <div key={index}>
              <Card
                title={playlist.name}
                image={playlist.thumbnail}
                description={playlist.description}
                playlistID={playlist._id}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default YourLibrary
