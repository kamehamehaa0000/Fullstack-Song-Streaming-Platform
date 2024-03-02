import React from 'react'
import Card from './shared/Card'
import { useRef } from 'react'
const CardDeck = ({ title, playlistData }) => {
  const cardContainerRef = useRef(null)

  const handleWheelScroll = (e) => {
    const container = cardContainerRef.current
    if (container) {
      container.scrollLeft += e.deltaY
    }
  }
  return (
    <div className="w-full select-none  dark:text-white flex flex-col  sm:p-4">
      <div className="sm:p-4">
        <h1 className="text-2xl text-black dark:text-white font-semibold">
          {title}
        </h1>
      </div>
      {/* <button
        onClick={(e) => {
          const container = cardContainerRef.current
          if (container) {
            container.scrollLeft += 100
          }
        }}
        className=" top-1/2 "
      >
        {'<'}
      </button> */}

      <div
        onWheel={handleWheelScroll}
        ref={cardContainerRef}
        className="relative flex flex-wrap-0 gap-4 sm:gap-6 py-4  sm:px-8 w-full overflow-x-auto "
      >
        <Card
          title={'Daily Mix 1'}
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://pics.craiyon.com/2023-06-17/ba7160d308af41d7a47054cbbc37753e.webp'
          }
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://e1.pxfuel.com/desktop-wallpaper/605/749/desktop-wallpaper-claire-yoshioka-spotify-playlist-cover-thumbnail.jpg'
          }
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://i.pinimg.com/564x/f5/31/be/f531be33d92a1431d5b274e65eae3a52.jpg'
          }
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://pics.craiyon.com/2023-06-17/ba7160d308af41d7a47054cbbc37753e.webp'
          }
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://e1.pxfuel.com/desktop-wallpaper/605/749/desktop-wallpaper-claire-yoshioka-spotify-playlist-cover-thumbnail.jpg'
          }
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://i.pinimg.com/564x/f5/31/be/f531be33d92a1431d5b274e65eae3a52.jpg'
          }
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          description={'songs that can make your evenings'}
        />
        <Card
          title={'Daily Mix 1'}
          image={
            'https://pics.craiyon.com/2023-06-17/ba7160d308af41d7a47054cbbc37753e.webp'
          }
          description={'songs that can make your evenings'}
        />
      </div>
    </div>
  )
}

export default CardDeck
