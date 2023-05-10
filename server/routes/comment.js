import commentController from '../controllers/comment.js';
import express from 'express';

const commentcontroller = new commentController

const router = express.Router()
    router.post('/createcomment', commentcontroller.createComment)
    router.get('/getall', commentcontroller.getAllComment)
    router.get('/getcomment/:id', commentcontroller.getComment)
    router.put('/updatecomment/:id', commentcontroller.updateComment)
    router.delete('/deletecomment/:id', commentcontroller.deleteComment)

export const commentRouter = router