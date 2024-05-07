import { createContext } from 'react'

const createPlaylistModalContext = createContext({
  isOpen: false,
  setIsOpen: (current) => {},
})

export default createPlaylistModalContext
