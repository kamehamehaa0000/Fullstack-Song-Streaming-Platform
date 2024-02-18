import React from 'react'

const HoverText = ({ text }) => {
  return (
    <div className="text-md font-semibold dark:hover:text-gray-400 hover:text-green-900 mx-3 text-white">
      <h2>{text}</h2>
    </div>
  )
}

export default HoverText
