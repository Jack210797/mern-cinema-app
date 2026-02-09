import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import BlurCircle from '../../components/BlurCircle'
import dateFormat from '../../lib/dateFormat'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || 'USD'

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUsers: 0
  })
  const [loading, setLoading] = useState(true)

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboardData.totalBookings || '0', icon: ChartLineIcon },
    { title: 'Total Revenue', value: currency + dashboardData.totalRevenue || '0', icon: CircleDollarSignIcon },
    { title: 'Active Shows', value: dashboardData.activeShows.length || '0', icon: PlayCircleIcon },
    { title: 'Total Users', value: dashboardData.totalUsers || '0', icon: UsersIcon }
  ]

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
              key={index}
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 text-lg font-medium">Active Movies</p>
      <div className="flex gap-5 mt-4 flex-wrap relative max-w-5xl">
        <BlurCircle top="100px" left="-10px" />
        {dashboardData.activeShows.map((show) => (
          <div
            className="w-55 rounded-lg h-full overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
            key={show._id}
          >
            <img src={show.movie.poster_path} alt="poster" className="w-full h-full object-cover" />
            <p className="text-sm font-medium p-2 truncate">{show.movie.title}</p>
            <div className="flex justify-between px-2 items-center">
              <p className="text-xl font-semibold">
                {currency} {show.showPrice}
              </p>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-primary fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default Dashboard
