import React, { useRef, useState } from 'react'
import Card from './shared/Card'

const CardDeck = ({ title, playlistData }) => {
  const cardContainerRef = useRef(null)

  const handleWheelScroll = (e) => {
    const container = cardContainerRef.current
    if (container) {
      container.scrollLeft += e.deltaY
    }
  }

  const scrollLeft = () => {
    const container = cardContainerRef.current
    if (container) {
      container.scrollLeft -= 3000
    }
  }

  const scrollRight = () => {
    const container = cardContainerRef.current
    if (container) {
      container.scrollLeft += 3000
    }
  }
  const [displayCount, setDisplayCount] = useState(10)

  const showMore = () => {
    setDisplayCount(displayCount + 10)
  }

  return (
    <div className="relative w-full select-none dark:text-white flex flex-col sm:p-4">
      <div className="sm:p-4 flex gap-5">
        <h1 className="text-2xl text-black dark:text-white font-semibold">
          {title}
        </h1>
        <div className="hidden md:flex">
          <button
            onClick={scrollLeft}
            className=" p-2 mx-3 w-10  bg-gray-300 dark:bg-zinc-700 rounded-full shadow-md"
            style={{ zIndex: 1 }}
          >
            {'<'}
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-300 w-10  dark:bg-zinc-700 rounded-full shadow-md"
            style={{ zIndex: 1 }}
          >
            {'>'}
          </button>{' '}
          {displayCount < playlistData.length && (
            <button
              onClick={showMore}
              className="p-2 bg-gray-500 dark:bg-zinc-700 text-white rounded-full shadow-md"
            >
              Show More
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div
          onWheel={handleWheelScroll}
          ref={cardContainerRef}
          className="relative grid grid-flow-col auto-cols-max grid-row-2 gap-4 sm:gap-6 py-4 sm:px-8 w-full overflow-x-auto"
        >
          {playlistData.slice(0, displayCount).map((item, index) => (
            <Card
              key={index}
              title={item.name}
              image={item.thumbnail}
              description={item.description}
              playlistID={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardDeck
