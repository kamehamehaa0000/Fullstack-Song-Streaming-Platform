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
import queueContext from '../contexts/queueContext.js'
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
  const { queue, setQueue } = useContext(queueContext)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    if (currentSong) {
      playSong(currentSong)
    }
  }, [currentSong])

  const playSong = (song) => {
    if (soundPlayed) {
      soundPlayed.stop()
    }
    const sound = new Howl({
      src: [song.track],
      html5: true,
      volume: volume,
      onend: () => {
        removeSongFromQueue(song)
        if (queue.length > 0) {
          playNextSong()
        } else {
          setIsPlaying(false)
        }
      },
    })
    setSoundPlayed(sound)
    setIsPlaying(true)
    sound.play()
  }

  const addSongToQueue = (song) => {
    setQueue([...queue, song])
  }

  const removeSongFromQueue = (song) => {
    setQueue(queue.filter((queuedSong) => queuedSong._id !== song._id))
  }

  const playNextSong = () => {
    if (queue.length == 0) {
      return
    }

    const nextSongIndex =
      queue.findIndex((song) => song._id === currentSong._id) + 1
    if (nextSongIndex < queue.length) {
      setCurrentSong(queue[nextSongIndex])
      playSong(queue[nextSongIndex])
    }
  }

  const playPreviousSong = () => {
    const previousSongIndex =
      queue.findIndex((song) => song._id === currentSong._id) - 1
    if (previousSongIndex >= 0) {
      setCurrentSong(queue[previousSongIndex])
      playSong(queue[previousSongIndex])
    }
  }

  const playPauseToggle = () => {
    if (!isPlaying) {
      if (!currentSong) {
        const firstSong = queue[0]
        setCurrentSong(firstSong)
        playSong(firstSong)
      } else {
        soundPlayed.play()
        setIsPlaying(true)
      }
    } else {
      soundPlayed.pause()
      setIsPlaying(false)
    }
  }
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value) // Get the new volume value from the slider
    setVolume(newVolume)
  }
  useEffect(() => {
    if (soundPlayed) {
      soundPlayed.volume(volume)
    }
  }, [volume])
  return (
    <div
      className={`${
        currentSong ? 'flex' : 'hidden'
      } w-full px-5 py-1 h-full items-center flex gap-10 text-white bg-black`}
    >
      <div className="flex min-w-[200px]">
        <div className="flex relative group items-center ">
          <img
            src={
              currentSong.thumbnail ||
              'https://upperground.art/wp-content/themes/artbat/assets/img/place.png'
            }
            alt=""
            className="w-[50px] h-[50px] max-w-[50px] max-h-[50px] rounded-lg"
          />
          <img
            src="https://i.pinimg.com/originals/a5/5a/68/a55a685b8375807667122027d72de120.gif"
            className="hidden h-fit m-w-[50px] rounded-lg group-hover:block absolute top-0 left-0 bg-white opacity-70 "
          />
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
      <div className="flex flex-col justify-center items-center w-3/5 ">
        <div className="flex items-center text-xl gap-5">
          <button onClick={playPreviousSong}>
            <TbPlayerSkipBackFilled />
          </button>
          <button className="" onClick={playPauseToggle}>
            {isPlaying ? (
              <TbPlayerPauseFilled className="text-white" />
            ) : (
              <TbPlayerPlayFilled className="text-white" />
            )}
          </button>
          <button onClick={playNextSong}>
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
      </div>
      <div className="min-w-[100px] flex items-center ">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}

export default Player
