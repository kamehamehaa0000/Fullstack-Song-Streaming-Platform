import { NavLink, Link } from 'react-router-dom'
import { FaSpotify } from 'react-icons/fa'
import { GoHome } from 'react-icons/go'
import { CiSearch } from 'react-icons/ci'
import { LuLibrary } from 'react-icons/lu'
import { CiSquarePlus } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { IoIosGlobe } from 'react-icons/io'

const Sidebar = () => {
  return (
    <div className="min-w-[250px] w-1/12 h-full p-2 flex flex-col  dark:bg-black dark:text-white bg-green-500 text-white">
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
  )
}

export default Sidebar
