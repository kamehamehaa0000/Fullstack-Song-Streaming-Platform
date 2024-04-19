import React from 'react'
import SingleSongCard from './shared/SingleSongCard'

const MySongs = () => {
  return (
    <div className="w-full min-h-[100vh] p-20 flex flex-grow flex-wrap gap-3 dark:text-white ">
      <div>
        <h1 className="text-2xl font-semibold p-6 ">My Songs</h1>{' '}
        <div className="w-full h-fit flex flex-grow flex-wrap gap-3 p-4  justify-start">
          <SingleSongCard
            songTitle="Say My Name"
            thumbnail="https://i.pinimg.com/736x/63/a0/08/63a008f631ae7492a75a001bd0791e8f.jpg"
          />
          <SingleSongCard thumbnail="https://marketplace.canva.com/EAE9iRlZ7OY/1/0/1600w/canva-chamber-modern-minimal-music-album-cover-art-T3CD56PvXLc.jpg" />
          <SingleSongCard />
          <SingleSongCard />
        </div>
      </div>
    </div>
  )
}

export default MySongs
