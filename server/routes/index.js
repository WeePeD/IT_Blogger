import {userRouter} from './user.js'
import {blogRouter } from './blog.js'

export default function route(app) {
    app.use('/user', userRouter)
    app.use('/blog', blogRouter)
}

