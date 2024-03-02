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
              className="rounded-full bg-white px-4 py-1 mx-3 text-black hover:bg-green-500 hover:text-white hover:border-2 dark:hover:bg-black dark:hover:text-white "
            >
              Log Out
            </button>
          </NavLink>{' '}
        </>
      ) : (
        <>
          <NavLink to={'/signup'}>
            <button>
              <HoverText text={'Sign Up'} />
            </button>
          </NavLink>
          <NavLink to={'/login'}>
            <button className="rounded-full bg-white px-4 py-1 mx-3 text-black hover:bg-green-500 hover:text-white hover:border-2 dark:hover:bg-black dark:hover:text-white ">
              Login
            </button>
          </NavLink>{' '}
        </>
      )}
    </div>
  )
}

export default Navbar
