import React, { useEffect, useState } from 'react'
import { makeAuthenticatedGETrequest } from '../utils/apiCall.js'
import { MdOutlineCancel } from 'react-icons/md'
import { TbError404 } from 'react-icons/tb'
import SearchSongCard from './shared/SearchSongCard.jsx'
const Search = ({ token }) => {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  let debounceTimer

  const searchSongs = async () => {
    const response = await makeAuthenticatedGETrequest(
      `/songs/get/song/${searchText}`,
      token
    )
    setSearchResult(response.data.data)

    console.error('Error fetching songs:', error)
  }
  const debounceSearch = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      searchSongs()
    }, 300)
  }
  useEffect(() => {
    if (searchText.trim() !== '') {
      debounceSearch()
    } else {
      setSearchResult([]) // Clear search results if search text is empty
    }
  }, [searchText])

  return (
    <>
      <div className="flex items-center justify-start pt-20 px-10 text-white">
        <div className="w-3/4 rounded-xl border-2 outline-none">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200  p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-white transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-black pl-2 text-base font-normal ouline-0"
              placeholder="Search a song"
            />
            <button
              className="text-xl  p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:scale-125 transition-colors outline-0"
              onClick={() => {
                setSearchText('')
                setSearchResult([])
              }}
            >
              <MdOutlineCancel />
            </button>
          </div>
        </div>
      </div>
      <div className=" bg-black rounded-xl mx-10 text-white">
        <h1 className="my-5 text-xl ">Your search result :</h1>
        <div className="flex flex-wrap gap-7 ">
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((song, index) => {
              return (
                <SearchSongCard
                  track={song.track}
                  songTitle={song.name}
                  thumbnail={song.thumbnail}
                  artist={song.artist.username}
                  duration={song.duration}
                  key={index}
                  info={song}
                  duringSearch={true}
                />
              )
            })
          ) : (
            <div className=" flex items-center justify-center">
              <h1 className="text-lg">No matching songs found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Search
