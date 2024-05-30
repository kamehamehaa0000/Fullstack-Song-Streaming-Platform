import React, { useState } from 'react'
import Card from './Card'
const ShowAllPlaylist = ({ title, playlistData }) => {
  const initialDisplayCount = 14
  const [displayCount, setDisplayCount] = useState(initialDisplayCount)

  const showAll = () => {
    setDisplayCount(displayCount + 14)
  }
  if (playlistData.length > 0) {
    return (
      <div className="flex flex-col">
        <div className="relative w-full select-none dark:text-white flex flex-col sm:p-4">
          <div className="sm:p-4">
            <h1 className="text-2xl text-black dark:text-white font-semibold">
              {playlistData.length ? title : ''}
            </h1>
          </div>
          <div className="grid gap-4 sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7  sm:gap-6 py-4 sm:px-8 w-full">
            {playlistData.slice(0, displayCount).map((item, index) => (
              <div className="h-[250px] md:h-[300px]">
                <Card
                  key={index}
                  title={item.name}
                  image={item.thumbnail}
                  description={item.description}
                  playlistID={item._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4" // Adjust these classes based on your desired column count
                />
              </div>
            ))}
          </div>{' '}
          {displayCount < playlistData.length && (
            <div className="flex justify-center mb-16">
              <button
                onClick={showAll}
                className="p-2 bg-zinc-900 text-sm  rounded-full shadow-md"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ShowAllPlaylist
