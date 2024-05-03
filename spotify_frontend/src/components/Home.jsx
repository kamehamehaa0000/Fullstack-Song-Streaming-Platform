import React, { useContext } from 'react'
import CardDeck from './CardDeck.jsx'
import Player from './shared/Player.jsx'
import songContext from './contexts/songContext.js'
const Home = () => {
  const { currentSong, setCurrentSong } = useContext(songContext)
  return (
    <div className="h-full w-screen ">
      <div className="bg-[#fae2db] z-[0]  py-4 flex gap-4 flex-wrap mt-16 dark:bg-black ">
        <CardDeck title={'Focus'} />
        <CardDeck title={'Trending'} />
        <CardDeck title={'Viral Charts'} />
      </div>
    </div>
  )
}

export default Home
