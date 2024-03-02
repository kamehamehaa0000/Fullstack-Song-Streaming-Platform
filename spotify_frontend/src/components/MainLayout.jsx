import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CardDeck from './CardDeck.jsx'
import { useCookies } from 'react-cookie'
const MainLayout = ({ children }) => {
  const [cookie, setCookie] = useCookies(['authToken'])

  return (
    <div>
      <div className=" flex w-screen h-[100vh] ">
        <Sidebar isLogin={cookie.authToken ? true : false} />
        <div
          className={`flex-1 z-40 h-screen dark:bg-black  overflow-y-scroll`}
        >
          <Navbar
            isLogin={cookie.authToken ? true : false}
            userDets={cookie.details}
          />
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
