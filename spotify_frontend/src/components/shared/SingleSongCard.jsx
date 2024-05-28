import React, { useContext, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { HiDotsVertical } from 'react-icons/hi'
import PlayerContext from '../contexts/songContext.js'
import queueContext from '../contexts/queueContext.js'
import addToPlaylistModalContext from '../contexts/addToPlaylistModalContext.js'
const SingleSongCard = ({
  songTitle = 'Title of the song',
  artist = '',
  duration = '_:_',
  thumbnail = 'https://images.genius.com/3c84341c543bd17134c0d4e15b3a26db.1000x1000x1.jpg',
  info,
}) => {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  duration = `${minutes}:${seconds.toString().padStart(2, '0')}`
  const { currentSong, setCurrentSong } = useContext(PlayerContext)
  const { queue, setQueue } = useContext(queueContext)
  const { isOpenPlaylist, setIsOpenPlaylist, setCrntSongId } = useContext(
    addToPlaylistModalContext
  )
  return (
    <div
      className={` text-white w-full h-16 min-w-[260px]  max-w-[350px]  bg-zinc-800 p-2 rounded-lg flex `}
    >
      <div
        onClick={() => {
          setCurrentSong(() => info)
          console.log(currentSong)
        }}
        className="relative group w-[45px] h-[45px] rounded-lg mr-3 overflow-hidden"
      >
        <img src={thumbnail} alt="" className="" />
        <div className="hidden  bg-black opacity-50 w-full h-full group-hover:flex items-center justify-center absolute top-0 rounded-lg">
          <button className="">
            <IoPlay className="text-green-500  text-2xl rounded-full" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden my-auto flex-grow">
        <h3 className="text-md hover:underline ">{songTitle}</h3>
        <h5 className="text-xs  hover:underline font-light">{artist}</h5>
      </div>
      <span className=" my-auto  text-zinc-500 mr-2">{duration}</span>
      <span className="relative group my-auto  text-white text-xl font-bold ">
        <button>
          <HiDotsVertical />
        </button>
        <div className="absolute z-30 top-0 left-2 w-max p-2 hidden group-hover:flex opacity-80 ">
          <div className="flex flex-col rounded-lg overflow-hidden bg-zinc-700 border-[2px]">
            <button
              onClick={() => {
                setCurrentSong(() => info)
              }}
              className="text-sm w-200px p-2  "
            >
              Play
            </button>
            <div className="h-[3px] w-full bg-white"></div>
            <button
              onClick={() => {
                setQueue((prev) => [...prev, info])
                console.log(queue)
              }}
              className="text-sm w-200px p-2  "
            >
              Add To Queue
            </button>
            <button
              onClick={() => {
                setIsOpenPlaylist(true)
                setCrntSongId(info._id)
              }}
              className="text-sm w-200px p-2  "
            >
              Add To Playlist
            </button>
          </div>
        </div>
      </span>
    </div>
  )
}

export default SingleSongCard
