import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from './components/Home.jsx'
import { useCookies } from 'react-cookie'
function App() {
  const [cookie, setCookie] = useCookies(['authToken'])
  console.log(cookie.authToken)
  return (
    <div className="w-screen h-[100vh] font-[Poppins]">
      <BrowserRouter>
        {cookie.authToken ? (
          <Routes>
            <Route path={'/home'} element={<Home />} />
            <Route path={'/'} element={<Home />} />
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
      </BrowserRouter>
    </div>
  )
}

export default App
