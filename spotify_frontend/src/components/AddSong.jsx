import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import TextInput from './shared/TextInput'
import axios from 'axios'
import { data } from 'autoprefixer'
const AddSong = ({ token }) => {
  const [songName, setSongName] = useState('')
  const [mp3File, setMp3File] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const ApiURL = import.meta.env.VITE_APIURL

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', songName)
    formData.append('track', mp3File)
    formData.append('thumbnail', imageFile)
    try {
      const response = await axios
        .post(`${ApiURL}/songs/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
          },
        })
        .catch((error) => {
          throw error
        })
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }

    // Reset form fields
    setSongName('')
    setMp3File(null)
    setImageFile(null)
  }

  return (
    <div className="w-full h-[100vh] flex flex-col dark:text-white  items-center justify-center">
      <div className=" flex flex-col max-w-md mt-16 p-10 dark:border-2 shadow-lg dark:border-white rounded-md ">
        <input
          type="text"
          onChange={(e) => setSongName(e.target.value)}
          value={songName}
          name="name"
          className="border-2 p-2 rounded-md"
        />
        <input
          type="file"
          onChange={(e) => {
            setMp3File(e.target.files[0])
          }}
          name="track"
          className="p-2 m-2 rounded-md"
          accept=".mp3"
        />
        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0])
          }}
          name="thumbnail"
          accept="image/*"
          className="p-2 m-2 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="p-2 m-2 bg-green-400 rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default AddSong
