import React, { useEffect, useState } from 'react'
import SingleSongCard from './shared/SingleSongCard'
import { makeAuthenticatedGETrequest } from '../utils/apiCall'
import { useCookies } from 'react-cookie'
import { Howl, Howler } from 'howler'
const MySongs = () => {
  const [cookie, setCookie] = useCookies(['authToken'])
  const token = cookie.authToken
  const [songData, setSongData] = useState([])
  const [currentSongPlaying, setCurrentSongPlaying] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const recievedData = await makeAuthenticatedGETrequest(
        '/songs/get/mysongs',
        token
      )
      console.log(recievedData)
      setSongData(recievedData.data.data)
    }
    getData()
  }, [])

  const playSound = (songSrc) => {
    if (currentSongPlaying) {
      currentSongPlaying.stop()
    }
    const sound = new Howl({
      src: [songSrc],
      html5: true,
      onend: function () {
        currentSongPlaying = null // Reset currentSongPlaying after the sound ends
      },
    })
    setCurrentSongPlaying(sound)

    sound.play()
  }

  return (
    <div className="w-full min-h-[100vh] p-20 flex flex-grow flex-wrap gap-3 dark:text-white ">
      <div>
        <h1 className="text-2xl font-semibold p-6 ">My Songs</h1>{' '}
        <div className="w-full h-fit flex flex-grow flex-wrap gap-3 p-4  justify-start">
          {songData.map((song) => {
            return (
              <SingleSongCard
                playSound={playSound}
                track={song.track}
                songTitle={song.name}
                thumbnail={song.thumbnail}
                artist={song.artist.username}
                duration={song.duration}
                key={song.id + 1}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MySongs
