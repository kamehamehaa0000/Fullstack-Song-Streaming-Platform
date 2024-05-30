import React from 'react'
import { FaPlay } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

const Card = ({ title, image, description, playlistID }) => {
  const navigate = useNavigate()
  const handleClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`)
  }

  return (
    <div className="flex flex-col h-full items-center group bg-green-500 dark:bg-stone-900 rounded-xl overflow-hidden m-2 p-3 transition-transform transform hover:scale-105 shadow-lg max-w-[200px]">
      <div className="relative w-full mb-3 rounded-md overflow-hidden">
        <img
          src={image || './card.webp'}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <button
          onClick={() => handleClick(playlistID)}
          className="hidden group-hover:block absolute bottom-2 right-2 rounded-full p-2 bg-green-500 text-white shadow-md"
        >
          <FaPlay />
        </button>
      </div>
      <h1 className="text-base font-bold text-center capitalize">{title}</h1>
      <p className="hidden sm:block text-sm font-normal text-center dark:text-zinc-400 mt-2">
        {description}
      </p>
    </div>
  )
}

export default Card
