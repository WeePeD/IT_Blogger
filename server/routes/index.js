import {userRouter} from './user.js'

export default function route(app) {
    app.use('/user',userRouter)
}

