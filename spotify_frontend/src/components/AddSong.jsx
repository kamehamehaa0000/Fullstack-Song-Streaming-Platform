import React, { useState } from 'react'
import axios from 'axios'

import { dotStream } from 'ldrs'

dotStream.register()

const AddSong = ({ token }) => {
  const [songName, setSongName] = useState('')
  const [mp3File, setMp3File] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const ApiURL = import.meta.env.VITE_APIURL
  const [songRecieved, setSongRecieved] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', songName)
    formData.append('track', mp3File)
    formData.append('thumbnail', imageFile)
    setLoading(true)
    try {
      const response = await axios
        .post(`${ApiURL}/songs/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          setSongRecieved(res?.data?.data?.createdSong?.track)
          setLoading(false)
          alert('Song successfully uploaded')
          setSongName('')
          setMp3File('')
          setImageFile('')
        })
        .catch((error) => {
          throw error
        })
      return response
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert(error?.response?.data?.data.error)
      setSongName('')
      setMp3File('')
      setImageFile('')
    }
  }
  const loadingAnimation = (
    <div className="  flex flex-col max-w-md mt-16 p-10  rounded-md ">
      <div className=" w-full h-full flex flex-col items-center justify-center ">
        <h5 className="m-3 font-semibold text-xl">Uploading</h5>
        <l-dot-stream size="100" speed="2.5" color="white"></l-dot-stream>
      </div>
    </div>
  )
  return (
    <div className="w-full h-[100vh] flex flex-col dark:text-white  items-center justify-center">
      {loading ? (
        loadingAnimation
      ) : (
        <div className="  flex flex-col max-w-md mt-16 p-10 dark:border-2  bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-lime-400 dark:border-indigo-400">
          <input
            type="text"
            onChange={(e) => setSongName(e.target.value)}
            value={songName}
            name="name"
            placeholder="Song Name"
            className="block m-2 w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 text-black"
          />
          <input
            type="file"
            onChange={(e) => {
              setMp3File(e.target.files[0])
            }}
            name="track"
            className="flex h-10 m-2 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium "
            accept=".mp3"
          />
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files)
              setImageFile(e.target.files[0])
            }}
            name="thumbnail"
            accept="image/*"
            className="flex h-10 m-2 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
          />
          <button
            onClick={handleSubmit}
            className="relative mx-auto my-4 w-1/2 px-8 py-2 rounded-md bg-black isolation-auto z-10 border-2 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          >
            Add Song
          </button>
          <audio controls src={songRecieved} className="mx-auto" />
        </div>
      )}
    </div>
  )
}

export default AddSong
