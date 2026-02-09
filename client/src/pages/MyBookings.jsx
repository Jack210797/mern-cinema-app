import { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import dateFormat from '../lib/dateFormat'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  }, [])

  return !isLoading ? (
    <div className="relative min-h-[80vh] px-6 md:px-16 lg:px-40 pt-30 md:pt-40">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-lg font-semibold mb-4 md:mb-8">My bookings</h1>

      {bookings.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-primary/8 p-2.5 mt-4 max-w-3xl border border-primary/20 rounded-lg"
        >
          <div className="flex flex-col md:flex-row">
            <img
              src={item.show.movie.poster_path}
              alt="movie Poster"
              className="h-auto md:h-36 md:max-w-45 rounded object-cover md:aspect-auto "
            />
            <div className="flex flex-col p-4 items-start justify-center gap-2">
              <p className="text-lg font-semibold text-white">{item.show.movie.title}</p>
              <p className="text-sm   text-gray-400">{timeFormat(item.show.movie.runtime)}</p>
              <p className="text-gray-400 text-sm mt-auto">{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-4">
              <p className=" font-semibold text-2xl">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <button className="bg-primary hover:bg-primary/90 text-sm rounded-full py-1.5 px-4 transition-all duration-200 active:scale-95 cursor-pointer font-semibold">
                  Pay Now
                </button>
              )}
            </div>

            <div className=" text-sm">
              <p>
                <span className="text-gray-400">Total Tickets:</span> {item.bookedSeats.length}
              </p>
              <p>
                <span className="text-gray-400">Seat Number:</span> {item.bookedSeats.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  )
}

export default MyBookings
