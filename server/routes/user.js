import userController from '../controllers/user.js'
import express from 'express';
const router = express.Router()

const usercontroller = new userController
    router.post('/createuser', usercontroller.createUser)
    router.get('/getall', usercontroller.getAllUser)
    router.get('/getuser/:id', usercontroller.getUser)
    router.put('/updateuser/:id', usercontroller.updateUser)
    router.delete('/deleteuser/:id', usercontroller.deleteUser)

export const userRouter = router