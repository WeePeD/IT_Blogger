import commentController from '../controllers/comment';
import express from 'express';

const router = express.Router()

const commentcontroller = new commentController
    router.post('/createcomment', commentcontroller.createComment)
    router.get('/getall', commentcontroller.getAllComment)
    router.get('/getcomment/:id', commentcontroller.getComment)
    router.put('/updatecomment/:id', commentcontroller.updateComment)
    router.delete('/deletecomment/:id', commentcontroller.deleteComment)

export const commentRouter = router