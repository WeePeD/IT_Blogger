import blogController from '../controllers/blog.js';
import express from 'express';

const router = express.Router()

const blogcontroller = new blogController
    router.post('/createblog', blogcontroller.createBlog)
    router.get('/getall', blogcontroller.getAllBlog)
    router.get('/getblog/:id', blogcontroller.getBlog)
    router.put('/updateblog/:id', blogcontroller.updateBlog)
    router.delete('/deleteblog/:id', blogcontroller.deleteBlog)
    
export const blogRouter = router