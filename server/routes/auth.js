import authController from "../controllers/auth.js";
import express from 'express';

const router = express.Router()

const authcontroller = new authController
    router.post('/register', authcontroller.register)
    router.post('/login', authcontroller.login)
    router.post('/verified/:id', authcontroller.verifiedMail)
    router.post('/resetcode', authcontroller.resetCode)
    router.get('/confirmcode/:id', authcontroller.confirmCode)
    router.post('/resetpass/:id', authcontroller.resetPassword)

export const authRouter = router