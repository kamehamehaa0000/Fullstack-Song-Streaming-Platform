import React from 'react'
import { NavLink } from 'react-router-dom'
const MenuTitle = ({ title, icon, target }) => {
  return (
    <NavLink to={target}>
      <div className=" ml-3 h-10 mt-2  rounded-lg  dark:bg-black">
        <div className="w-full h-full flex items-center rounded-lg dark:hover:backdrop-filter dark:hover:backdrop-blur-sm dark:hover:bg-opacity-40  dark:hover:bg-white dark:hover:text-black hover:bg-green-600">
          <div className=" mx-2 text-3xl">{icon}</div>
          <h1 className=" text-md font-medium">{title}</h1>
        </div>
      </div>
    </NavLink>
  )
}

export default MenuTitle
