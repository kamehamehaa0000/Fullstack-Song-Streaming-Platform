import React, { useEffect, useState } from 'react'
import SingleSongCard from './shared/SingleSongCard'
import { makeAuthenticatedGETrequest } from '../utils/apiCall'
import { useCookies } from 'react-cookie'

const MySongs = () => {
  const [cookie, setCookie] = useCookies(['authToken'])
  const token = cookie.authToken
  const [songData, setSongData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const recievedData = await makeAuthenticatedGETrequest(
        '/songs/get/mysongs',
        token
      )
      setSongData(recievedData.data.data)
    }
    getData()
  }, [])

  return (
    <div className="w-full min-h-[100vh] p-20 flex flex-grow flex-wrap gap-3 dark:text-white ">
      <div>
        <h1 className="text-2xl font-semibold p-6 ">My Songs</h1>{' '}
        <div className="w-full h-fit flex flex-grow flex-wrap gap-3 p-4  justify-start">
          {songData.map((song, index) => {
            return (
              <SingleSongCard
                track={song.track}
                songTitle={song.name}
                thumbnail={song.thumbnail}
                artist={song.artist.username}
                duration={song.duration}
                key={index}
                info={song}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MySongs
