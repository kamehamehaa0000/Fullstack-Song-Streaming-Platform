import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CardDeck from './CardDeck.jsx'
const Home = () => {
  return (
    <div className=" flex w-screen h-full ">
      <Sidebar />
      <div className={`flex-1 h-screen dark:bg-black  overflow-y-scroll`}>
        <Navbar />
        <div
          id="content"
          className="bg-[#fae2db] z-[2] p-4 flex gap-4 flex-wrap mt-16 dark:bg-black "
        >
          <CardDeck title={'Focus'} />
        </div>
      </div>
    </div>
  )
}

export default Home
