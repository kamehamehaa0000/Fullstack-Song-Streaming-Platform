import React, { createElement, useContext, useState } from 'react'
import createPlaylistModalContext from './contexts/createPlaylistModal'
import { makeAuthenticatedPOSTrequest } from '../utils/apiCall'
import axios from 'axios'
import { dotStream } from 'ldrs'
import { toast } from 'react-toastify'
dotStream.register()

const CreatePlaylist = ({ token }) => {
  const { isOpen, setIsOpen } = useContext(createPlaylistModalContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)
  const ApiURL = import.meta.env.VITE_APIURL

  const createPlaylist = async () => {
    if (!name || !thumbnail) {
      toast.error('Please fill all fields.')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('thumbnail', thumbnail)
    formData.append('songs', [])
    formData.append('description', description)

    try {
      const response = await axios.post(`${ApiURL}/playlist/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      })
      toast.success('Playlist Successfully Created !')
      setLoading(false)
      setName('')
      setDescription('')
      setThumbnail(null)
      setIsOpen(false)
    } catch (error) {
      // Log any errors
      toast.error(`Error creating playlist - ${error}`)
      console.error('Error creating playlist:', error)
      setLoading(false)
      // Set an error state or handle the error in UI
    }
  }
  const loadingAnimation = (
    <>
      <div className="flex flex-col m-4  rounded-md ">
        <l-dot-stream size="80" speed="3" color="white" />
      </div>
    </>
  )
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
          <div className="relative z-10">
            <div className="max-w-md mt-16 p-10 dark:border-2 bg-white dark:bg-zinc-950 shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
              <h1 className="text-white px-2">Name & Description - </h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Playlist Name"
                className="block m-2 w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 text-black"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Playlist Desciption"
                className="block m-2 w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 text-black"
              />
              <h1 className="text-white px-2">Thumbnail - </h1>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="flex h-10 m-2 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
              />
              {loading ? (
                <div className="flex justify-center mt-4">
                  {loadingAnimation}
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <button
                    onClick={createPlaylist}
                    className="relative mx-2 my-4 w-1/2 px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2 border-neutral-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                  >
                    Create Playlist
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePlaylist
