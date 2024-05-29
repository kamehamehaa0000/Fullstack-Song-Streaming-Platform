import React from 'react'
import { FaPlay } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

const Card = ({ title, image, description, playlistID }) => {
  const navigate = useNavigate()
  const handleClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`)
  }
  return (
    <div className="max-w-[270px] group col-span-1 text-white flex flex-col h-full p-3 rounded-xl sm:min-w-[190px] bg-green-500 dark:bg-stone-900 ">
      <div className="z-1 relative overflow-hidden w-full mb-1 rounded-md">
        <img src={image ? `${image}` : `./card.webp`} alt="" />
        <button
          onClick={() => handleClick(playlistID)}
          className="hidden group-hover:block absolute bottom-1 right-1 rounded-full w-fit p-2 bg-green-500"
        >
          <FaPlay />
        </button>
      </div>
      <h1 className="text-sm sm:text-md py-2 font-bold capitalize">{title}</h1>
      <p className="hidden sm:block text-sm font-normal capitalize dark:text-zinc-400">
        {description}
      </p>
    </div>
  )
}

export default Card
