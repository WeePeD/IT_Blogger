import blogController from '../controllers/blog.js';
import express from 'express';

const blogcontroller = new blogController

const router = express.Router()
    //Actual route
    router.get('/home',blogcontroller.getAllBlog)
    router.get('/new',blogcontroller.newBlog)

    //Test route
    router.post('/createblog', blogcontroller.createBlog)
    router.get('/test/getall', blogcontroller.testGetAll)
    router.get('/:slug', blogcontroller.getBlog)
    router.put('/updateblog/:id', blogcontroller.updateBlog)
    router.delete('/deleteblog/:id', blogcontroller.deleteBlog)
    
export const blogRouter = router