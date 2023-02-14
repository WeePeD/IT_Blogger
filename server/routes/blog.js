import blogController from '../controllers/blog.js';
import express from 'express';
const router = express.Router()

const blogcontroller = new blogController
    router.post('/createblog', blogcontroller.createBlog)
    router.get('/getall', blogcontroller.getAllBlog)
export const blogRouter = router