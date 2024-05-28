import { createContext } from 'react'

const addToPlaylistModalContext = createContext({
  crntSongId: null,
  setCrntSongId: () => {},
  isOpenPlaylist: false,
  setIsOpenPlaylist: (current) => {},
})

export default addToPlaylistModalContext
