import { NavLink, Link } from 'react-router-dom'
import { FaSpotify } from 'react-icons/fa'
import { GoHome } from 'react-icons/go'
import { CiSearch } from 'react-icons/ci'
import { LuLibrary } from 'react-icons/lu'
import { CiSquarePlus } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { IoIosGlobe } from 'react-icons/io'
import { LuListMusic } from 'react-icons/lu'
import { useState, useRef, useEffect, useCallback, useContext } from 'react'
import MenuTitle from './shared/MenuTitle'
import React from 'react'
import createPlaylistModalContext from './contexts/createPlaylistModal'

const Sidebar = ({ isLogin }) => {
  const { isOpen, setIsOpen } = useContext(createPlaylistModalContext) // for playlist modal
  const sidebarRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(260)
  const [sidebarShowing, setSidebarShowing] = useState(false)
  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        )
      }
    },
    [isResizing]
  )

  useEffect(() => {
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResizing)
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resize, stopResizing])

  return (
    <div className="flex h-full z-50 ">
      <div
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
        className={`min-w-52 h-full p-2 flex flex-col dark:bg-black dark:text-white bg-green-500 text-white overflow-hidden`}
      >
        <div className="w-full flex items-center ml-4 mt-4  ">
          <FaSpotify className="inline text-5xl mr-2 text-white  " />
          <h1 className="inline text-3xl font-semibold text-white text-left">
            Spotify
          </h1>
        </div>
        <div className="flex flex-col w-full mt-10 pb-5">
          <MenuTitle title={'Home'} icon={<GoHome />} target={''} />
          <MenuTitle title={'Search'} icon={<CiSearch />} target={'/search'} />
        </div>
        {isLogin ? (
          <div className="w-full flex flex-col mt-4 ">
            <NavLink>
              <div
                onClick={() => {
                  alert('This Feature is currently in development.')
                }}
                className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black"
              >
                <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                  <FaHeart className="h-7 w-7 bg-gradient-to-br from-green-900 to-slate-50  dark:from-violet-900 dark:to-slate-50 text-white rounded-sm p-[4px] mx-2 text-2xl" />
                  <h1 className=" text-md font-medium">Liked Songs</h1>
                </div>
              </div>
            </NavLink>
            <MenuTitle
              title={'Your Library'}
              icon={<LuLibrary />}
              target={'/myplaylists'}
            />

            <NavLink to={'/mysongs'}>
              <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
                <div className="w-full h-full flex items-center rounded-lg  dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                  <LuListMusic className="h-7 w-7  rounded-sm p-[4px] mx-2 text-2xl" />
                  <h1 className=" text-md font-medium">My Songs</h1>
                </div>
              </div>
            </NavLink>
            <NavLink
              onClick={() => {
                console.log(isOpen)
                setIsOpen(!isOpen)
              }}
            >
              <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
                <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                  <CiSquarePlus className=" rounded-lg mx-2 text-3xl" />
                  <h1 className=" text-md font-medium">Create Playlist</h1>
                </div>
              </div>
            </NavLink>

            <NavLink to={'/addsong'}>
              <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
                <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                  <CiSquarePlus className=" rounded-lg mx-2 text-3xl" />
                  <h1 className=" text-md font-medium">Add a Song</h1>
                </div>
              </div>
            </NavLink>
          </div>
        ) : (
          ''
        )}

        <div className="flex-1 "></div>
        <div className="w-full h-28 bottom-12 select-none ml-1">
          <h1 className=" my-3 text-sm">
            Made by{' '}
            <a
              href="Https://www.github.com/kamehamehaa0000"
              target="_blank"
              className="underline underline-offset-4"
            >
              Aayush Gupta
            </a>
          </h1>
        </div>
      </div>
      <div
        className="app-sidebar-resizer flex items-center justify-center h-full bg-black w-[5px]"
        onMouseDown={startResizing}
      >
        <div
          className="w-[3px] rounded-full h-[50px] bg-white"
          onClick={() => {
            setSidebarShowing((prev) => !prev)
            if (sidebarShowing === true) {
              setSidebarWidth(0)
              sidebarRef.current.style.display = 'none'
            } else {
              sidebarRef.current.style.display = 'flex'
            }
          }}
        ></div>
      </div>
    </div>
  )
}
export default Sidebar
