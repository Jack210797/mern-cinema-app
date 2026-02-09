import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import BlurCircle from './BlurCircle'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateSelect = () => {
    if (!selectedDate) {
      return toast('Please select a date', { icon: '⚠️' })
    }

    navigate(`/movies/${id}/${selectedDate}`)
    scrollTo(0, 0)
  }
  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="-120px" right="-30px" />
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className=" flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-2 sm:grid-cols-4 md:flex md:max-w-lg gap-4">
              {dateTime &&
                Object.keys(dateTime).map((date) => (
                  <button
                    onClick={() => setSelectedDate(date)}
                    key={date}
                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-lg cursor-pointer ${
                      selectedDate === date ? 'bg-primary text-white' : 'border border-primary/70'
                    }`}
                  >
                    <span>{new Date(date).getDate()}</span>
                    <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </button>
                ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>
        <button
          onClick={handleDateSelect}
          className="bg-primary hover:bg-primary/90 text-white rounded-4xl py-4 px-24 transition-all duration-200 active:scale-95 cursor-pointer font-semibold text-[16px]"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default DateSelect
