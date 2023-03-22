import {userModel} from '../models/user.js';

export default class userController {
    /**
    * @swagger
    * components:
    *  schemas:
    *      User:
    *          type: object
    *          require:
    *              -   email
    *              -   password   
    *          properties:
    *              userName:
    *                  type: string
    *                  description: User name 
    *              email:
    *                  type: string
    *                  description: User'email to login
    *              password:
    *                  type: string
    *                  description: User'password to login
    *              isAdmin:
    *                  type: boolean
    *                  description: Check if this user is the admin or not
    *              gender:
    *                  type: string
    *                  description: Gender
    *              status:
    *                  type: string
    *                  description: Check if the account has been active or not
    *              confirmationCode:
    *                  type: string
    *                  description: User code to active their account
    *              blogs:
    *                  type: array
    *                  description: User's blogs
    *              comments:
    *                  type: array
    *                  description: User's comment in blogs
    *              skill:
    *                  type: array
    *                  description: User's skills
    *              job:
    *                  type: string
    *                  description: User's job
    *              role:
    *                  type: string
    *                  description: User's role
    */    




    /**
    * @swagger
    * /user/createuser:
    *  post:
    *      summary: Create new user
    *      tags: [Users]
    *      requestBody:
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      $ref: '#/components/schemas/User'
    *      responses:
    *          201:
    *              description: New user created
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/User'
    *          500:
    *              description: Internal error !
    */
    async createUser(req,res) {
        const newUser = userModel({
            email: req.body.email,
            password: req.body.password,    
            createAt: new Date()
        })
        const saveUser = await newUser.save()
        if (!saveUser) res.status(500)
                          .json({message: 'Internal error !'})
        res.status(201)
            .json({message: saveUser})
    }

    /**
    * @swagger
    * /user/getall:
    *  get:
    *   summary: Returns the list of all user
    *   tags: [Users]
    *   responses:
    *       200:
    *           description: The list of user
    *           content:
    *               application/json:
    *                   schema:
    *                   type: array
    *                   items:
    *                       $ref: '#/components/schemas/User'
    *       404:
    *           description: Cannot find user !
    */     
    async getAllUser(req,res) {
        const users = await userModel.find({})
        if (!users) res.status(404)
                       .json({message: 'Cannot find user !'})
        res.status(200)
           .json({userList: users})
    }

    /**
    * @swagger
    * /user/getuser/{id}:
    *  get:
    *   summary: Get user by their id
    *   tags: [Users]
    *   parameters:
    *      - in: path
    *        name: id
    *        schema: 
    *           type: string
    *        required: true
    *        description: User id
    *   responses:
    *       200:
    *           description: User found by id
    *           content: 
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/User'
    *       404:
    *           description: User cannot found
    * 
    */   
    async getUser(req,res) {
        const user = await userModel.findById(req.params.id)
        if (!user) res.status(404)
                      .json({message: 'Cannot find user !'})
        res.status(200)
           .json({user: user})
    }

    /** 
    * @swagger
    * /user/updateuser/{id}:
    *   put:
    *       summary: Update user by their id
    *       tags: [Users]
    *       parameters:
    *         - in: path
    *           name: id
    *           schema: 
    *               type: string
    *           required: true
    *           description: User id
    *       requestBody:
    *           required: true
    *           content: 
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/User'
    *       responses:
    *           200:
    *               description: User has been updated
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/User'
    *           404:          
    *               description: Cannot find user
    *           500:
    *               description: Internal error !
    */
    async updateUser(req,res) {
        const updateUser = await userModel.findByIdAndUpdate(req.params.id,{$set:req.body})
        if (!updateUser) res.status(404)
                            .json({message: 'Cannot find user !'})
        res.status(200)
           .json({message: 'Update user !'})
    }

    /** 
    * @swagger
    * /user/deleteuser/{id}:
    *   delete:
    *       summary: Delete user by their id
    *       tags: [Users]
    *       parameters:
    *         - in: path
    *           name: id
    *           schema: 
    *               type: string
    *           required: true
    *           description: User id
    *       responses:
    *           200:
    *               description: User has been deleted
    *           404:          
    *               description: Cannot find user
    *           500:
    *               description: Internal error !
    */
    async deleteUser(req,res) {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(204)
           .json({message: 'Delete user !'})
    }

    /**
     * @swagger
     * /user/getblogs/{id}:
     *  get:
     *      summary: Get user's blogs by their id
     *      tags: [Users]
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *              type: string
     *          required: true
     *          description: User id
     *      responses:
     *          200:
     *              description: User blogs found by id
     *          404: 
     *              description: Cannot find user.
     *                          
     */
    async getUserBlog(req,res) {
        const findUser = await userModel.findById(req.params.id)
                                        .populate('blogs')
        res.status(200)
           .json({message:findUser.blogs})
    }

    async deleteAllBlogComment(req,res) {
        await userModel.findByIdAndUpdate(req.params.id,{$set:{blogs:[],comments:[]}})
        res.status(200)
           .json({message:"Delete done !"})
    }
}


