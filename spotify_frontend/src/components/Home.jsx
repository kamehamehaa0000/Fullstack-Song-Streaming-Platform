import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import CardDeck from './CardDeck.jsx'
import { useCookies } from 'react-cookie'
const Home = () => {
  const [cookie, setCookie] = useCookies(['authToken'])

  return (
    <div
      id="content"
      className="bg-[#fae2db] z-[0] p-4 flex gap-4 flex-wrap mt-16 dark:bg-black "
    >
      <CardDeck title={'Focus'} />
      <CardDeck title={'Trending'} />
      <CardDeck title={'Viral Charts'} />
    </div>
  )
}

export default Home
