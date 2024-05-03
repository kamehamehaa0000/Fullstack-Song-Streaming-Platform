import { createContext } from 'react'

const currentSong = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPlaying: null,
  setIsPlaying: () => {},
})

export default currentSong
