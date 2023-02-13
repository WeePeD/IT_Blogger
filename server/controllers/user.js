import user from '../../../../../Sem1_4th/IT_Project/wibuworld/src/main/webapp/script/model/user.js';
import {userModel} from '../models/user.js';

export default class userController {
    /**
    * @swagger
    * components:
    *  schemas:
    *      User:
    *          type: Object
    *          require:
    *              -   email
    *              -   password   
    *          properties:
    *              userName:
    *                  type: String
    *                  desciption: User name 
    *              email:
    *                  type: String
    *                  desciption: User'email to login
    *              password:
    *                  type: String
    *                  desciption: User'password to login
    *              isAdmin:
    *                  type: Boolean
    *                  desciption: Check if this user is the admin or not
    *              gender:
    *                  type: String
    *                  description: Gender
    *              status:
    *                  type: String
    *                  desciption: Check if the account has been active or not
    *              confirmationCode:
    *                  type: String
    *                  desciption: User code to active their account
    *              blogs:
    *                  type: Array
    *                  description: User's blogs
    *              comments:
    *                  type: Array
    *                  description: User's comment in blogs
    *              skill:
    *                  type: Array
    *                  description: User's skills
    *              job:
    *                  type: String
    *                  description: User's job
    *              role:
    *                  type: String
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
     *          200:
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
            password: req.body.password
        })
        const saveUser = await newUser.save()
        if (!saveUser) res.json({message: "Internal error !"})
        res.json({message: saveUser})
    }

    /**
    * @swagger
    * /user:
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
    *       500:
    *           description: Cannot find user !
     */     
    async getAllUser(req,res) {
        const users = await userModel.find({})
        if (!users) res.json({message: "Cannot find user !"})
        res.json({userList: users})
    }
}


