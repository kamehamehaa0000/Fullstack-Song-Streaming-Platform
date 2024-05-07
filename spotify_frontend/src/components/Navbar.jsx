import React from 'react'
import HoverText from './shared/hoverText'
import { NavLink } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Navbar = ({ isLogin, userDets }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  const handleLogout = () => {
    removeCookie('authToken')
    removeCookie('details')
  }
  return (
    <div className=" absolute left-0 z-[2] top-0 flex items-center justify-end w-full h-16 dark:bg-black bg-[#22C55E]  ">
      <div className="hidden sm:flex">
        <HoverText text={'Premium'} />
      </div>
      <div className="hidden sm:flex">
        <HoverText text={'Support'} />
      </div>
      <div className="hidden sm:flex">
        <HoverText text={'Download'} />
      </div>
      <span className="w-[2px] bg-white h-2/3" />
      {isLogin ? (
        <>
          <NavLink>
            <button>
              <HoverText text={`Hey, ${userDets.username}`} />
            </button>
          </NavLink>
          <NavLink to={'/login'}>
            <button
              onClick={handleLogout}
              className="relative mx-2 my-4   px-3 py-1 rounded-full bg-black isolation-auto z-10 border-2 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 "
            >
              Log Out
            </button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={'/signup'}>
            <button>
              <HoverText text={'Sign Up'} />
            </button>
          </NavLink>
          <NavLink to={'/login'}>
            <button className="relative mx-auto my-4  px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 ">
              Login
            </button>
          </NavLink>{' '}
        </>
      )}
    </div>
  )
}

export default Navbar
