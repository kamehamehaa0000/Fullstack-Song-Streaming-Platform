import React from 'react'
import { IoPlay } from 'react-icons/io5'
import { HiDotsVertical } from 'react-icons/hi'

const SingleSongCard = ({
  songTitle = 'Title of the song',
  artist = 'Kr$na',
  duration = '_:_',
  thumbnail = 'https://images.genius.com/3c84341c543bd17134c0d4e15b3a26db.1000x1000x1.jpg',
}) => {
  return (
    <div className="text-white w-full h-16 min-w-[260px] overflow-hidden max-w-[400px]  bg-zinc-800 p-2 rounded-lg flex ">
      <div className="relative group w-[45px] h-[45px] rounded-lg mr-3 overflow-hidden">
        <img src={thumbnail} alt="" className="" />
        <div className="hidden  bg-black opacity-50 w-full h-full group-hover:flex items-center justify-center absolute top-0 rounded-lg">
          <button
            onClick={() => {
              console.log('clicked')
            }}
            className=""
          >
            <IoPlay className="text-green-500  text-2xl rounded-full" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden my-auto flex-grow">
        <h3 className="text-md hover:underline ">{songTitle}</h3>
        <h5 className="text-xs  hover:underline font-light">{artist}</h5>
      </div>
      <span className=" my-auto  text-zinc-500 mr-2">{duration}</span>
      <span className=" my-auto  text-white text-xl font-bold ">
        <button>
          <HiDotsVertical />
        </button>
      </span>
    </div>
  )
}

export default SingleSongCard
