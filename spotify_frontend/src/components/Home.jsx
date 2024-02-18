import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useState, useRef, useEffect, useCallback } from 'react'
import CardDecks from './shared/CardDecks'
const Home = () => {
  return (
    <div className=" flex w-screen h-full">
      <Sidebar />
      <div className={`flex-1 h-screen dark:bg-black  overflow-y-scroll`}>
        <Navbar />
        <div className="z-[2] p-4 flex gap-4 flex-wrap mt-16 dark:bg-black ">
          <CardDecks
            title={'Daily Mix 1'}
            description={'songs that can make your evenings'}
          />
          <CardDecks
            title={'Daily Mix 1'}
            description={'songs that can make your evenings'}
          />
          <CardDecks
            title={'Daily Mix 1'}
            description={'songs that can make your evenings'}
          />
          <CardDecks
            title={'Daily Mix 1'}
            description={'songs that can make your evenings'}
          />
          <CardDecks
            title={'Daily Mix 1'}
            description={'songs that can make your evenings'}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
