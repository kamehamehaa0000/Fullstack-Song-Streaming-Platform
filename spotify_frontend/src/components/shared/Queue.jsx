import { React, useContext } from 'react'
import { IoPlay } from 'react-icons/io5'
import queueContext from '../contexts/queueContext.js'
import { CiSquareRemove } from 'react-icons/ci'

const Queue = ({ isShow }) => {
  const { queue, setQueue } = useContext(queueContext)
  return (
    <div
      className={` absolute bottom-[95%] w-[300px]  rounded-lg  ${
        isShow ? 'flex' : 'hidden'
      } bg-zinc-900 `}
    >
      <div className="max-h-[500px] grid grid-cols-1 gap-2 p-4 overflow-y-scroll ">
        {queue.map((song, index) => {
          return (
            <div
              key={index}
              className={` text-white w-full h-16 min-w-[260px] hover:bg-zinc-900  max-w-[370px]  bg-zinc-800 p-2 rounded-lg flex `}
            >
              <div className="relative group w-[45px] h-[45px] rounded-lg mr-3 overflow-hidden">
                <img src={song?.thumbnail} alt="" className="" />
                <div className="hidden  bg-black opacity-50 w-full h-full group-hover:flex items-center justify-center absolute top-0 rounded-lg">
                  <button className="">
                    <IoPlay className="text-green-500  text-2xl rounded-full" />
                  </button>
                </div>
              </div>
              <div className="overflow-hidden my-auto flex-grow">
                <h3 className="text-md hover:underline ">{song?.name}</h3>
                <h5 className="text-xs  hover:underline font-light">
                  {song.artist.firstName}
                </h5>
              </div>
              <span className=" flex items-center  text-white text-3xl font-bold ">
                <button
                  onClick={() => {
                    setQueue((prev) => {
                      return prev.filter((el) => el._id !== song._id)
                    })
                  }}
                >
                  <CiSquareRemove />
                </button>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Queue
