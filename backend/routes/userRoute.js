import express from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post("/signup", signupUser);
userRoute.post("/login", loginUser);

export default userRoute;