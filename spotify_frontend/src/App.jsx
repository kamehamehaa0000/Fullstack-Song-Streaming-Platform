import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import { useCookies } from 'react-cookie'
import MainLayout from './components/MainLayout.jsx'
import AddSong from './components/AddSong.jsx'
import MySongs from './components/MySongs.jsx'
import songContext from './components/contexts/songContext.js'
import { useState, useContext } from 'react'
import SingleSongCard from './components/shared/SingleSongCard.jsx'
import Player from './components/shared/Player.jsx'

function App() {
  const [cookie, setCookie] = useCookies(['authToken'])
  const [currentSong, setCurrentSong] = useState('initial')
  const [soundPlayed, setSoundPlayed] = useState(null)
  const [isPlaying, setIsPlaying] = useState(true)
  return (
    <div className="w-screen h-[100vh] font-[Poppins]">
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
    </div>
  )
}

export default App
