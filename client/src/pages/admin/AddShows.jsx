import { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react'
import { kConverter } from '../../lib/kConverter'

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || 'USD'

  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeSelection, setDateTimeSelection] = useState({})
  const [dateTimeInput, setDateTimeInput] = useState('')
  const [showPrice, setShowPrice] = useState('')

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData)
  }

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return
    const [date, time] = dateTimeInput.split('T')
    if (!date || !time) return

    setDateTimeSelection((prev) => {
      const times = prev[date] || []
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] }
      }
      return prev
    })
  }

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time)
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [date]: filteredTimes }
    })
  }

  useEffect(() => {
    fetchNowPlayingMovies()
  }, [])

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows" />

      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="pb-4 overflow-x-auto">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}
              key={movie.id}
              onClick={() => setSelectedMovie(movie._id)}
            >
              <div className="relative rounded-lg overflow-hidden">
                <img src={movie.poster_path} alt="poster" className="w-full object-cover brightness-90" />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
                </div>
              </div>
              {selectedMovie === movie._id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary w-6 h-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/*Show price input */}
      <div className="mt-8">
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Show Price
        </label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3  rounded-md py-2">
          <p className="text-sm text-gray-400">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>

      {/*Date & Time Selection */}
      <div className="mt-6">
        <label htmlFor="" className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex items-center gap-5 border border-gray-600 pl-3  rounded-lg">
          <input
            min={0}
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary  cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/*Display Selected Time */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div className="border border-primary px-2 py-1 flex items-center rounded" key={time}>
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary-dull cursor-pointer transition-all">
        Add Show
      </button>
    </>
  ) : (
    <Loading />
  )
}

export default AddShows
