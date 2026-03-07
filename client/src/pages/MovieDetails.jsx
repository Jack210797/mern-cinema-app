/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlurCircle from '../components/BlurCircle'
import { ArrowRight, HeartIcon, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)

  const { shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url } = useAppContext()

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)

      if (data.success) {
        setShow(data.show)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorite = async () => {
    try {
      if (!user) {
        return toast.error('Please sign in to add to favorites')
      }

      const { data } = await axios.post(
        '/api/user/update-favorite',
        { movieId: id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )

      if (data.success) {
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={image_base_url + show.movie.poster_path}
          alt="poster"
          className=" object-cover rounded-xl h-104 max-md:mx-auto max-w-70"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">{show.movie.title}</h1>

          <div className="flex gap-2 items-center text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-sm font-normal max-w-xl text-gray-400 mt-2 leading-tight">{show.movie.overview}</p>

          <p className="text-gray-400 mt-2 text-sm font-normal">
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map((genre) => genre.name).join(', ')} •{' '}
            {show.movie.release_date.split('-')[0]}
          </p>

          <div className="mt-8 flex items-center flex-wrap gap-4.5">
            <button className="flex gap-2 items-center bg-gray-800 text-white px-7 py-3 rounded-md hover:bg-gray-900 transition-all duration-200 font-medium cursor-pointer active:scale-95">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="cursor-pointer bg-primary hover:bg-primary-dull px-10 text-sm py-3 rounded-md font-medium transition-all duration-200 active:scale-95"
            >
              Buy Ticket
            </a>
            <button
              onClick={handleFavorite}
              className="bg-gray-700 p-2.5 rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-200 active:scale-95"
            >
              <HeartIcon
                className={`w-5 h-5 ${favoriteMovies.find((movie) => movie._id === id) ? 'fill-primary text-primary' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-20 text-lg font-medium text-white">Your Favorite Cast</p>
      <div className="no-scrollbar overflow-x-auto mt-8 pb-4">
        <div className="flex items-center gap-6 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast) => (
            <div key={cast.name} className="flex flex-col items-center text-center">
              <img
                src={image_base_url + cast.profile_path}
                alt={cast.name}
                className="h-20 md:h-20 aspect-square rounded-full object-cover"
              />
              <p className="text-sm font-semibold mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <div className=" pt-44">
        <div className="relative flex items-center justify-between">
          <BlurCircle top="0" right="-80px" />
          <p className="text-gray-300 font-medium text-lg">You May Also Like</p>
          <button
            onClick={() => navigate('/movies')}
            className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
          >
            View All <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
          </button>
        </div>

        <div className=" gap-7 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {shows.slice(0, 4).map((show) => (
            <MovieCard key={show._id} movie={show} />
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <button
            onClick={() => {
              navigate('/movies')
              scrollTo(0, 0)
            }}
            className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Loading />
    </div>
  )
}

export default MovieDetails
