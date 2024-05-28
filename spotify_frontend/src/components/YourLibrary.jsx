import React, { useEffect, useState } from 'react'
import { makeAuthenticatedGETrequest } from '../utils/apiCall'
import Card from './shared/Card.jsx'
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
  return (
    <div className="w-full h-full py-16 sm:px-6 text-white">
      <h1 className="text-xl lg:text-3xl py-5 my-3 font-semibold">
        Your Library
      </h1>
      <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-5">
        {playlistData.map((playlist, index) => {
          return (
            <div key={index}>
              <Card
                title={playlist.name}
                image={playlist.thumbnail}
                description={playlist.description}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default YourLibrary
