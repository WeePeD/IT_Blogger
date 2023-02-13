import userController from '../controllers/user.js'
import express from 'express';
const router = express.Router()

const usercontroller = new userController
    router.post('/createuser', usercontroller.createUser)
    router.get('/',usercontroller.getAllUser)

export const userRouter = router