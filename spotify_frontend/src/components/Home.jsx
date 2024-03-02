import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CardDeck from './CardDeck.jsx'
import { useCookies } from 'react-cookie'
const Home = () => {
  const [cookie, setCookie] = useCookies(['authToken'])

  return (
    <div className=" flex w-screen h-full ">
      <Sidebar />
      <div className={`flex-1 h-screen dark:bg-black  overflow-y-scroll`}>
        <Navbar
          isLogin={cookie.authToken ? true : false}
          userDets={cookie.details}
        />
        <div
          id="content"
          className="bg-[#fae2db] z-[2] p-4 flex gap-4 flex-wrap mt-16 dark:bg-black "
        >
          <CardDeck title={'Focus'} />
          <CardDeck title={'Trending'} />
          <CardDeck title={'Viral Charts'} />
        </div>
      </div>
    </div>
  )
}

export default Home
