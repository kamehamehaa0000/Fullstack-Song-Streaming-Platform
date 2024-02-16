import { NavLink, Link } from 'react-router-dom'
import { FaSpotify } from 'react-icons/fa'
import { GoHome } from 'react-icons/go'
import { CiSearch } from 'react-icons/ci'
import { LuLibrary } from 'react-icons/lu'
import { CiSquarePlus } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { IoIosGlobe } from 'react-icons/io'
import { useState, useRef, useEffect, useCallback } from 'react'
import React from 'react'
const Sidebar = () => {
  const sidebarRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(268)
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
    <div className="flex h-full select-none	">
      <div
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
        className="min-w-[250px] h-full p-2 flex flex-col  dark:bg-black dark:text-white bg-green-500 text-white"
      >
        <div className="w-full flex items-center ml-4 mt-4 ">
          <FaSpotify className="inline text-5xl mr-2 text-white " />
          <h1 className="inline text-3xl font-semibold text-white text-left ">
            Spotify
          </h1>
        </div>
        <div className="flex flex-col w-full  pb-5">
          <NavLink>
            <div className=" ml-3 h-10 mt-10  rounded-lgbg-white dark:bg-black">
              <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                <GoHome className=" mx-2 text-3xl " />
                <h1 className=" text-md font-medium">Home</h1>
              </div>
            </div>
          </NavLink>
          <NavLink>
            <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
              <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                <CiSearch className=" mx-2 text-3xl" />
                <h1 className=" text-md font-medium">Search</h1>
              </div>
            </div>
          </NavLink>
          <NavLink>
            <div className=" ml-3 h-10 mt-2  rounded-lg   dark:bg-black">
              <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black  hover:bg-green-600">
                <LuLibrary className=" mx-2 text-3xl" />
                <h1 className=" text-md font-medium">Your Library</h1>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="w-full flex flex-col mt-6 ">
          <NavLink>
            <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
              <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                <CiSquarePlus className=" rounded-lg mx-2 text-3xl" />
                <h1 className=" text-md font-medium">Create Playlist</h1>
              </div>
            </div>
          </NavLink>
          <NavLink>
            <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
              <div className="w-full h-full flex items-center rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
                <FaHeart className="h-7 w-7 bg-gradient-to-br from-green-900 to-slate-50  dark:from-violet-900 dark:to-slate-50 text-white rounded-sm p-[4px] mx-2 text-2xl" />
                <h1 className=" text-md font-medium">Liked Songs</h1>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="w-full fixed bottom-12  ml-1">
          <div className="w-fit rounded-full text-sm px-3 py-1 flex items-center gap-1 border-2 border-white hover:bg-green-600">
            <IoIosGlobe className="text-2xl" />
            English
          </div>
          <h1 className="fixed bottom-4 left-2  text-sm">
            By Aayush Gupta with <span className="text-red-600"> ❤</span>
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
