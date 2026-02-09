import { StarIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  return (
    <div className=" flex flex-col justify-between p-3 rounded-2xl bg-gray-800 hover:-translate-y-1 transition duration-300 w-full h-full">
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-lg aspect-auto object-cover cursor-pointer h-40 w-full"
        onClick={() => {
          navigate(`/movies/${movie._id}`)
          scrollTo(0, 0)
        }}
      />

      <div className="mt-2 flex flex-col justify-between flex-1">
        <p className="font-semibold truncate">{movie.title}</p>

        <p className="text-sm text-gray-400 mt-1">
          {new Date(movie.release_date).getFullYear()} •
          {movie.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join('|')}
          • {timeFormat(movie.runtime)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 pb-2">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`)
            scrollTo(0, 0)
          }}
          className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm  text-gray-400">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

export default MovieCard
