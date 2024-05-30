import React, { useState } from 'react'
import SingleSongCard from './SingleSongCard'

const ShowAllSongs = ({ songsData }) => {
  const initialDisplayCount = 10 // Number of songs to display initially
  const [displayCount, setDisplayCount] = useState(initialDisplayCount)

  const showMoreSongs = () => {
    setDisplayCount((prevCount) => prevCount + initialDisplayCount)
  }

  return (
    <div className="w-full flex flex-col justify-center px-4 lg:px-8 ">
      <h1 className="text-2xl mb-4 text-black dark:text-white font-semibold">
        {songsData && 'Songs'}
      </h1>
      <div className="flex  w-10/12 flex-wrap justify-start">
        {songsData.slice(0, displayCount).map((song, index) => (
          <div key={index} className="m-2">
            <SingleSongCard
              track={song.track}
              songTitle={song.name}
              thumbnail={song.thumbnail}
              artist={song.artist.username}
              duration={song.duration}
              info={song}
            />
          </div>
        ))}
      </div>
      <div className="my-4 w-full flex items-center justify-start">
        {displayCount < songsData.length && (
          <button
            onClick={showMoreSongs}
            className="mt-4 w-[150px] px-2 py-2 text-sm bg-zinc-900 text-white rounded-full"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  )
}

export default ShowAllSongs
