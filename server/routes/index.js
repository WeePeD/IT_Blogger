import {userRouter} from './user.js';
import {blogRouter} from './blog.js';
import {authRouter} from './auth.js';
import {commentRouter} from './comment.js';

export default function route(app) {
    app.use('/user', userRouter)
    app.use('/blog', blogRouter)
    app.use('/auth', authRouter)
    app.use('/comment', commentRouter)
}

