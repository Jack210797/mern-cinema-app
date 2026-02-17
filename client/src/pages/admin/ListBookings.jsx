import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import dateFormat from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || 'USD'

  const { axios, getToken, user } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      setBookings(data.bookings)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      getAllBookings()
    }
  }, [])

  return !isLoading ? (
    <div>
      <Title text1="List" text2="Bookings" />

      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden text-nowrap rounded-md">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {bookings.map((booking, index) => (
              <tr className="border-b border-primary/10 bg-primary/5 even:bg-primary/10" key={index}>
                <td className="p-2 min-w-45 pl-5">{booking.user.name}</td>
                <td className="p-2">{booking.show.movie.title}</td>
                <td className="p-2">{dateFormat(booking.show.showDateTime)}</td>
                <td className="p-2">
                  {Object.keys(booking.bookedSeats)
                    .map((seat) => booking.bookedSeats[seat])
                    .join(', ')}
                </td>
                <td className="p-2">
                  {currency} {booking.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ListBookings
