import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/soTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'

const SeatLayouts = () => {
  const groupRows = [
    ['A', 'B'],
    ['C', 'D'],
    ['E', 'F'],
    ['G', 'H'],
    ['I', 'J']
  ]

  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const navigate = useNavigate()

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id)
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      })
    }
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast('Please select a time first', { icon: '⚠️' })
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast('You can select maximum 5 seats', { icon: '⚠️' })
    }
    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]))
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, index) => {
          const seatId = `${row}${index + 1}`
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                selectedSeats.includes(seatId) && 'bg-primary text-white'
              }`}
            >
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    if (id && date) {
      getShow()
    }
  }, [id, date])

  return show ? (
    <div className=" flex flex-col md:flex-row px-6 pt-40 md:px-16 lg:px-40 md:pt-50">
      {/* available timings */}
      <div className="w-56 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-3 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* seat layout */}
      <div className="flex flex-1 flex-col relative items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="-0px" right="0px" />
        <h1 className="font-semibold text-2xl mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" className="w-full max-w-md" />
        <p className="font-semibold text-gray-400 mb-6 text-sm">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-1 md:gap-2 mb-6">{groupRows[0].map((row) => renderSeats(row))}</div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, index) => (
              <div key={index}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/my-bookings')}
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition   rounded-full font-medium cursor-pointer active:scale-95 "
        >
          Proceed to checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayouts
