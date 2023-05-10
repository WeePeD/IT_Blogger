import { blogModel } from '../models/blog.js';
import { userModel } from '../models/user.js';

export default class blogController {
    
    /**
    * @swagger
    * components:
    *  schemas:
    *      Blog:
    *          type: object
    *          require: 
    *               - userId
    *               - blogName
    *               - content
    *               - tags
    *          properties:
    *              userId:
    *                  type: string
    *                  description: User id of the blog 
    *              blogName:
    *                  type: string
    *                  description: The blog name
    *              content:
    *                  type: string
    *                  description: Blog content
    *              tags:
    *                  type: array
    *                  items: 
    *                       type: string
    *                  description: Tag for the blog
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
            blogName: req.body.blogName,
            comments: req.body.comments,
            content: req.body.content,
            createAt: new Date()
        })
        await userModel.findByIdAndUpdate(req.body.userId,{$push: {blogs:newBlog._id}})
        const saveBlog = await newBlog.save()
        if (!saveBlog) res.status(500)
                          .json({message: 'Internal error !'})
        res.status(201)
           .json(saveBlog)
    }

    newBlog(req,res) {
        res.render("newBlog")
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
                                     .populate('userId')
        if (!blogs) res.status(404)
                       .json({message: 'Cannot find blog !'})
        
        res.status(200)
           .render("home",{blogs:blogs})
    }

    /**
    * @swagger
    * /blog/getblog/{slug}:
    *  get:
    *   summary: Get blog by their slug
    *   tags: [Blogs]
    *   parameters:
    *      - in: path
    *        name: slug
    *        schema: 
    *           type: string
    *        required: true
    *        description: Blog slug
    *   responses:
    *       200:
    *           description: Blog found by slug
    *           content: 
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/Blog'
    *       404:
    *           description: Blog cannot found
    * 
    */   
    async getBlog(req,res) {
        const blog = await blogModel.findOne({slug: req.params.slug})
        if (!blog) res.status(404)
                      .json({message: 'Cannot find blog !'})
        res.status(200)
           .render("blog",{blog:blog})
    }

    /** 
    * @swagger
    * /blog/updateblog/{id}:
    *   put:
    *       summary: Update blog by their id
    *       tags: [Blogs]
    *       parameters:
    *         - in: path
    *           name: id
    *           schema: 
    *               type: string
    *           required: true
    *           description: Blog id
    *       requestBody:
    *           required: true
    *           content: 
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/Blog'
    *       responses:
    *           200:
    *               description: Blog has been updated
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/Blog'
    *           404:          
    *               description: Cannot find blog
    *           500:
    *               description: Internal error !
    */
    async updateBlog(req,res) {
        const updateBlog = await blogModel.findByIdAndUpdate(req.params.id,{$set:req.body})
        if (!updateBlog) res.status(404)
                            .json({message: 'Cannot find blog !'})
        res.status(200)
           .json({message: 'Update blog !'})
    }

    /** 
    * @swagger
    * /blog/deleteblog/{id}:
    *   delete:
    *       summary: Delete blog by their id
    *       tags: [Blogs]
    *       parameters:
    *         - in: path
    *           name: id
    *           schema: 
    *               type: string
    *           required: true
    *           description: Blog id
    *       responses:
    *           200:
    *               description: Blog has been deleted
    *           404:          
    *               description: Cannot find blog
    *           500:
    *               description: Internal error !
    */
    async deleteBlog(req,res) {
        await blogModel.findByIdAndDelete(req.params.id)
        await userModel.findOneAndUpdate({blogs:req.params.id},{$pull: {blogs: req.params.id}})
        res.status(204)
           .json({message: 'Delete blog !'})
    }
}