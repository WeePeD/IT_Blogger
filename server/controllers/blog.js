import { blogModel } from "../models/blog.js";

export default class blogController {
    
    /**
    * @swagger
    * components:
    *  schemas:
    *      Blog:
    *          type: object
    *          properties:
    *              userId:
    *                  type: types.objectid
    *                  description: User id of the blog 
    *              comments:
    *                  type: array
    *                  description: The blog comments
    *              content:
    *                  type: string
    *                  description: Blog content
    */    



    
    /**
    * @swagger
    * /blog/createblog:
    *  post:
    *      summary: Create new blog
    *      tags: [Blogs]
    *      requestBody:
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      $ref: '#/components/schemas/Blog'
    *      responses:
    *          201:
    *              description: New blog created
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/Blog'
    *          500:
    *              description: Internal error !
    */
    async createBlog(req,res) {
        const newBlog = blogModel({
            userId: req.body.userId,
            comments: req.body.comments,
            content: req.body.content
        })
        const saveBlog = await newBlog.save()
        if (!saveBlog) res.status(500)
                          .json({message: 'Internal error !'})
        res.status(201)
           .json({message: saveBlog})
    }

    /**
    * @swagger
    * /blog/getall:
    *  get:
    *   summary: Returns the list of all blog
    *   tags: [Blogs]
    *   responses:
    *       200:
    *           description: The list of blog
    *           content:
    *               application/json:
    *                   schema:
    *                   type: array
    *                   items:
    *                       $ref: '#/components/schemas/Blog'
    *       404:
    *           description: Cannot find blog !
    */     
    async getAllBlog(req,res) {
        const blogs = await blogModel.find({})
        if (!blogs) res.status(404)
                       .json({message: 'Cannot find blog !'})
        res.status(200)
           .json({blogList: blogs})
    }
}