import express from 'express'
import { getFavoriteMovies, getUserBookings, updateFavoriteMovies } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/bookings', getUserBookings)
userRouter.post('/update-favorite', updateFavoriteMovies)
userRouter.get('/favorites', getFavoriteMovies)

export default userRouter
