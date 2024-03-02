import React from 'react'
import TextInput from './shared/TextInput'

const AddSong = () => {
  return (
    <div className="dark:text-white mt-16 ">
      <div className="w-full flex flex-col items-center justify-center">
        <form action="" className="w-1/2 max-w-[400px]">
          <TextInput label={'Song Name'} placeholder={'Song name'} />
        </form>
      </div>
    </div>
  )
}

export default AddSong
