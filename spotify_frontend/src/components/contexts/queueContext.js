import { createContext } from 'react'

const queueContext = createContext({
  queue: [],
  setQueue: (currentSong) => {},
  currentQueueIndex: 0,
  setCurrentQueueIndex: (currentIndex) => {},
})

export default queueContext
