import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import { useCookies } from 'react-cookie'
import MainLayout from './components/MainLayout.jsx'
import AddSong from './components/AddSong.jsx'
import MySongs from './components/MySongs.jsx'
import songContext from './components/contexts/songContext.js'
import queueContext from './components/contexts/queueContext.js'
import createPlaylistModalContext from './components/contexts/createPlaylistModal.js'
import { useState, useContext } from 'react'
import Search from './components/Search.jsx'
import CreatePlaylist from './components/CreatePlaylist.jsx'

function App() {
  const [cookie, setCookie] = useCookies(['authToken'])
  const [currentSong, setCurrentSong] = useState('initial')
  const [soundPlayed, setSoundPlayed] = useState(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [queue, setQueue] = useState([])
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false) // for create playlist Model

  return (
    <div className="w-screen h-[100vh] font-[Poppins]">
      <createPlaylistModalContext.Provider value={{ isOpen, setIsOpen }}>
        <CreatePlaylist token={cookie.authToken} />
        <queueContext.Provider
          value={{ queue, setQueue, currentQueueIndex, setCurrentQueueIndex }}
        >
          <BrowserRouter>
            {cookie.authToken ? (
              <songContext.Provider
                value={{
                  currentSong,
                  setCurrentSong,
                  soundPlayed,
                  setSoundPlayed,
                  isPlaying,
                  setIsPlaying,
                }}
              >
                <MainLayout>
                  <Routes>
                    <Route path={'/home'} element={<Home />} />
                    <Route path={'/'} element={<Home />} />
                    <Route
                      path={'/addsong'}
                      element={<AddSong token={cookie.authToken} />}
                    />
                    <Route path={'/mysongs'} element={<MySongs />} />
                    <Route
                      path="/search"
                      element={<Search token={cookie.authToken} />}
                    />
                    <Route
                      path="/createplaylist"
                      element={<CreatePlaylist token={cookie.authToken} />}
                    />
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </MainLayout>
              </songContext.Provider>
            ) : (
              <MainLayout>
                //logged out routes
                <Routes>
                  <Route path={'/home'} element={<Home />} />
                  <Route path={'/'} element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </MainLayout>
            )}
          </BrowserRouter>
        </queueContext.Provider>
      </createPlaylistModalContext.Provider>
    </div>
  )
}

export default App
