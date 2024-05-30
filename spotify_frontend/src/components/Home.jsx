import React, { useState, useEffect } from 'react'
import CardDeck from './CardDeck.jsx'
import { makeUnauthenticatedGETrequest } from '../utils/apiCall.js'
import ShowAllPlaylist from './shared/ShowAllPlaylist.jsx'
import ShowAllSongs from './shared/ShowAllSongs.jsx'

const Home = () => {
  const [playlistData, setPlaylistData] = useState([])
  const [songsData, setSongsData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeUnauthenticatedGETrequest('/playlist/getall')

      setPlaylistData(response.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const response = await makeUnauthenticatedGETrequest(
        '/songs/get/allsongs'
      )
      setSongsData(response.data.data)
    }
    fetchData()
  }, [])

  return (
    <div className="h-full w-screen  ">
      <div className="bg-[#fae2db] z-[0]  py-4 flex gap-4 flex-wrap pb-20 mt-16 dark:bg-black ">
        <CardDeck title={'Focus'} playlistData={playlistData.slice(0, 10)} />
        <ShowAllPlaylist
          title={'Playlists'}
          playlistData={playlistData.slice(11)}
        />
        <ShowAllSongs songsData={songsData} />
      </div>
    </div>
  )
}

export default Home
