import React, { useContext, useEffect, useState, useRef } from 'react'
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbPlaylistAdd,
} from 'react-icons/tb'
import { LuRepeat, LuRepeat1 } from 'react-icons/lu'
import { IoVolumeMute } from 'react-icons/io5'
import { Howl, Howler } from 'howler'
import songContext from '../contexts/songContext.js'
import queueContext from '../contexts/queueContext.js'
import addToPlaylistModalContext from '../contexts/addToPlaylistModalContext.js'
import { VscClearAll } from 'react-icons/vsc'
import { HiOutlineQueueList } from 'react-icons/hi2'
import Queue from './Queue.jsx'

const Player = () => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPlaying,
    setIsPlaying,
  } = useContext(songContext)
  const { isOpenPlaylist, setIsOpenPlaylist, setCrntSongId } = useContext(
    addToPlaylistModalContext
  )
  const { queue, setQueue } = useContext(queueContext)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const [repeatOnce, setRepeatOnce] = useState(false)
  const progressRef = useRef(null)
  const [showQueue, setShowQueue] = useState(false)
  useEffect(() => {
    if (currentSong) {
      playSong(currentSong)
    }
  }, [currentSong])

  useEffect(() => {
    if (soundPlayed) {
      soundPlayed.volume(volume)
    }
  }, [volume])

  useEffect(() => {
    const updateProgress = () => {
      if (soundPlayed && soundPlayed.playing()) {
        setProgress((soundPlayed.seek() / soundPlayed.duration()) * 100)
      }
    }

    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [soundPlayed])

  const playSong = (song) => {
    if (soundPlayed) {
      soundPlayed.stop()
    }

    const sound = new Howl({
      src: [song.track],
      html5: true,
      volume: volume,
      onend: () => handleSongEnd(),
    })

    setSoundPlayed(sound)
    setIsPlaying(true)
    sound.play()
  }

  const handleSongEnd = () => {
    if (repeatOnce) {
      soundPlayed.seek(0)
      soundPlayed.play()
    } else {
      const currentSongIndex = queue.findIndex(
        (song) => song._id === currentSong._id
      )
      if (currentSongIndex + 1 < queue.length) {
        setCurrentSong(queue[currentSongIndex + 1])
      } else {
        setIsPlaying(false)
        setCurrentSong(null)
      }
    }
  }

  const playNextSong = () => {
    const currentSongIndex = queue.findIndex(
      (song) => song._id === currentSong._id
    )
    if (currentSongIndex + 1 < queue.length) {
      setCurrentSong(queue[currentSongIndex + 1])
    }
  }

  const playPreviousSong = () => {
    const currentSongIndex = queue.findIndex(
      (song) => song._id === currentSong._id
    )
    if (currentSongIndex > 0) {
      setCurrentSong(queue[currentSongIndex - 1])
    }
  }

  const playPauseToggle = () => {
    if (!isPlaying) {
      if (!currentSong && queue.length > 0) {
        setCurrentSong(queue[0])
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
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
  }

  const handleProgressClick = (event) => {
    const boundingRect = progressRef.current.getBoundingClientRect()
    const clickPosition = event.clientX - boundingRect.left
    const clickProgress = clickPosition / boundingRect.width
    if (soundPlayed) {
      soundPlayed.seek(soundPlayed.duration() * clickProgress)
      setProgress(clickProgress * 100)
    }
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }
  const clearQueue = () => {
    setQueue([])
  }
  return (
    <div
      className={`${
        currentSong ? 'flex' : 'hidden'
      } w-full px-2 sm:px-5 py-1 h-full items-center grid grid-cols-6 md:grid-cols-3 gap-10 text-white bg-black`}
    >
      <div className="col-span-1 flex min-w-[200px]">
        <div className="flex relative items-center">
          <img
            src={
              currentSong?.thumbnail ||
              'https://upperground.art/wp-content/themes/artbat/assets/img/place.png'
            }
            alt=""
            className="w-[50px] h-[50px] max-w-[50px] max-h-[50px] rounded-lg"
          />
        </div>
        <div className=" hidden sm:flex-col md:flex">
          <p className="hover:underline hover:cursor-pointer text-md mx-2">
            {currentSong?.name || 'song name'}
          </p>
          <p className="hover:underline hover:cursor-pointer text-sm mx-2">
            {currentSong?.artist?.firstName || 'artist'}
          </p>
        </div>
      </div>

      <div className="col-span-5 w-full md:col-span-1 justify-self-start flex flex-col items-center">
        <p className="md:hidden text-xs">{currentSong?.name || 'song name'}</p>
        <div className="w-full flex items-center gap-3">
          {formatTime(soundPlayed?.seek() || 0)}
          <div
            ref={progressRef}
            className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {formatTime(currentSong?.duration || 0)}
        </div>
        <div className="flex items-center text-xl gap-5 mt-2">
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
          <button onClick={() => setRepeatOnce((prev) => !prev)}>
            {repeatOnce ? <LuRepeat1 /> : <LuRepeat />}
          </button>
        </div>
      </div>
      <div className="min-w-[100px] hidden sm:col-span-1 md:flex justify-self-end items-center">
        <Queue isShow={showQueue} />
        <button
          onClick={() => {
            setShowQueue((prev) => !prev)
          }}
          title="Queue"
          className=" "
        >
          <HiOutlineQueueList className="text-2xl mx-3" />
        </button>
        <button title="Clear Queue" onClick={clearQueue}>
          <VscClearAll className="text-2xl mx-3" />
        </button>
        <button
          title="Add To Playlist"
          onClick={() => {
            setCrntSongId(currentSong._id)
            setIsOpenPlaylist(true)
          }}
        >
          <TbPlaylistAdd className="text-3xl mx-3" />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <button onClick={() => setVolume(0)}>
          <IoVolumeMute className="text-2xl mx-3" />
        </button>
      </div>
    </div>
  )
}

export default Player
