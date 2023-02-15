import authController from "../controllers/auth.js";
import express from 'express';
const router = express.Router();

const authcontroller = new authController
    router.post('/register', authcontroller.register)
    router.post('/login', authcontroller.login)
    router.post('/verified/:id', authcontroller.verifiedMail)

export const authRouter = router