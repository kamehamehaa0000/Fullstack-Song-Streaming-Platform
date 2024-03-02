import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import { useCookies } from 'react-cookie'
import MainLayout from './components/MainLayout.jsx'
import AddSong from './components/AddSong.jsx'
function App() {
  const [cookie, setCookie] = useCookies(['authToken'])

  return (
    <div className="w-screen h-[100vh] font-[Poppins]">
      <BrowserRouter>
        <MainLayout>
          {cookie.authToken ? (
            <Routes>
              <Route path={'/home'} element={<Home />} />
              <Route path={'/'} element={<Home />} />
              <Route path={'/addsong'} element={<AddSong />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={'/home'} element={<Home />} />
              <Route path={'/'} element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </MainLayout>
      </BrowserRouter>
    </div>
  )
}

export default App
