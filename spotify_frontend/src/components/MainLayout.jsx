import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Player from './shared/Player.jsx'
import { useCookies } from 'react-cookie'
const MainLayout = ({ children }) => {
  const [cookie, setCookie] = useCookies(['authToken'])

  return (
    <div>
      <div className="flex w-screen h-screen ">
        <Sidebar isLogin={cookie.authToken ? true : false} />
        <div className={`flex-1 z-40 h-full dark:bg-black  overflow-y-scroll`}>
          <Navbar
            isLogin={cookie.authToken ? true : false}
            userDets={cookie.details}
          />
          <main className="h-[92%]">{children}</main>{' '}
        </div>
        {cookie.authToken ? (
          <div className="w-full z-[100] h-[8%] min-h-[80px] fixed bottom-0  ">
            <Player />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default MainLayout
