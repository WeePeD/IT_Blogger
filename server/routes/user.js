import userController from '../controllers/user.js';
import express from 'express';
import verifiedToken from '../middlewares/verifiedToken.js';

const usercontroller = new userController

const router = express.Router()
    //Actual route
    router.get('/:slug',)

    //Test route
    router.post('/createuser', usercontroller.createUser)
    router.get('/getall', usercontroller.getAllUser)
    router.get('/getuser/:id', usercontroller.getUser)
    router.put('/updateuser/:id', usercontroller.updateUser)
    router.delete('/deleteuser/:id', usercontroller.deleteUser)
    router.get('/getblogs/:id',usercontroller.getUserBlog)
    router.get('/deleteBlCo/:id', usercontroller.deleteAllBlogComment)
    
export const userRouter = router