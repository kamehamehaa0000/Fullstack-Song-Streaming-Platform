import React from 'react'
import SingleSongCard from './SingleSongCard'

const SinglePlaylistView = ({ data, token, refreshPlaylist }) => {
  return (
    <div
      className="w-full mx-auto bg-gradient-to-b from-sky-700
     to-black text-white p-4 sm:p-6 rounded-lg"
    >
      {data ? (
        <>
          <div className="flex flex-col md:flex-row w-full items-center mb-6">
            <img
              src={data?.thumbnail || 'https://via.placeholder.com/150'}
              alt="Playlist Cover"
              className=" mx-auto w-full sm:w-1/3 h-full max-h-60  rounded-xl mr-6"
            />
            <div className="h-full self-start text-center sm:text-left w-full p-4">
              <h1 className="text-2xl md:text-4xl xl:text-6xl font-semibold">
                {data?.name || 'Title of the playlist'}
              </h1>
              <p className="text-gray-300 mt-2 text-sm md:text-sm  xl:text-lg py-2">
                {data?.description || 'description of the playlist'}
              </p>
              <p className="text-gray-300 text-sm md:text-sm  xl:text-lg font-semibold">
                Creator -{' '}
                <span className="underline text-sm font-medium">
                  {data?.owner?.username || 'owner and collaborator'}
                </span>
              </p>
            </div>
          </div>

          <div className="text-gray-300 mb-2">
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="text-lg">Songs</div>
            </div>
          </div>
          <div>
            {data?.songs?.map((song, index) => {
              return (
                <div className="m-2" key={index}>
                  <SingleSongCard
                    track={song.track}
                    songTitle={song.name}
                    thumbnail={song.thumbnail}
                    artist={song.artist.username}
                    duration={song.duration}
                    info={song}
                    inPlaylist={true}
                    playlistID={data._id}
                    token={token}
                    refreshPlaylist={refreshPlaylist}
                  />
                </div>
              )
            })}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default SinglePlaylistView
