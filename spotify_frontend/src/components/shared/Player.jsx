import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { TbPlayerPauseFilled } from 'react-icons/tb'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { TbPlayerSkipForwardFilled } from 'react-icons/tb'
import { TbPlayerSkipBackFilled } from 'react-icons/tb'
import { LuRepeat } from 'react-icons/lu'
import { LuRepeat1 } from 'react-icons/lu'
import { Howl, Howler } from 'howler'
import songContext from '../contexts/songContext.js'
const Player = () => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPlaying,
    setIsPlaying,
  } = useContext(songContext)
  const [repeatOnce, setRepeatOnce] = useState(false)

  useEffect(() => {
    if (!currentSong) {
      return
    }
    changeSong(currentSong.track)
  }, [currentSong])

  const playSound = () => {
    if (!soundPlayed) {
      return
    }
    soundPlayed.play()
  }
  const changeSong = () => {
    if (soundPlayed) {
      soundPlayed.stop()
    }
    const sound = new Howl({
      src: [currentSong?.track],
      html5: true,
      onend: function () {
        setCurrentSong(null) // Reset currentSongPlaying after the sound ends
      },
    })
    setSoundPlayed(sound)
    setIsPlaying(true)
    sound.play()
  }
  const pauseSound = () => {
    soundPlayed.pause()
  }
  return (
    <div
      className={`${
        currentSong.track ? 'flex' : 'hidden'
      } w-full px-5 py-1 h-full items-center flex gap-10 text-white bg-black`}
    >
      <div className="flex min-w-[200px]">
        <div className="flex relative group items-center ">
          <img
            src={currentSong.thumbnail || ''}
            alt=""
            className=" w-[50px] h-[50px] max-w-[50px] max-h-[50px] rounded-lg"
          />
          <img
            src="https://i.pinimg.com/originals/a5/5a/68/a55a685b8375807667122027d72de120.gif"
            className="hidden h-fit m-w-[50px]  rounded-lg group-hover:block absolute top-0 left-0  bg-white opacity-70 "
          ></img>
        </div>
        <div className="">
          <p className="hover:underline hover:cursor-pointer text-md mx-2">
            {currentSong?.name || 'song name'}
          </p>
          <p className="hover:underline hover:cursor-pointer text-sm mx-2">
            {currentSong?.artist?.firstName || 'artist'}
          </p>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center w-3/5 ">
        <div className="flex items-center text-xl gap-5">
          <button>
            <TbPlayerSkipBackFilled />
          </button>

          <button
            className=""
            onClick={() => {
              if (!isPlaying) {
                playSound(currentSong.track)
                setIsPlaying((prev) => !prev)
              } else {
                pauseSound()
                setIsPlaying((prev) => !prev)
              }
            }}
          >
            {isPlaying ? (
              <TbPlayerPauseFilled className="text-white" />
            ) : (
              <TbPlayerPlayFilled className="text-white" />
            )}
          </button>
          <button>
            <TbPlayerSkipForwardFilled />
          </button>
          <button
            onClick={() => {
              setRepeatOnce((prev) => !prev)
            }}
          >
            {repeatOnce ? <LuRepeat1 /> : <LuRepeat />}
          </button>
        </div>
        <div>progress bar</div>
      </div>
      <div className=" min-w-[100px] flex items-center ">
        <input type="range" max={100} min={0} className="" />
      </div>
      {/* <TbPlayerPauseFilled />
      <TbPlayerPlayFilled />
      <TbPlayerSkipBackFilled />
      <TbPlayerSkipForwardFilled />
      <LuRepeat />
      <LuRepeat1 />
      <TbPlayerPlay /> */}
    </div>
  )
}

export default Player
