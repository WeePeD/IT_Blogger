import { commentModel } from '../models/comment.js';
import { userModel } from '../models/user.js';
import { blogModel } from '../models/blog.js';

export default class commentController {
    
    /**
    * @swagger
    * components:
    *  schemas:
    *      Comment:
    *          type: object
    *          properties:
    *              userId:
    *                  type: string
    *                  description: User id of the comment 
    *              blog:
    *                  type: string
    *                  description: The blog id of the comment
    *              content:
    *                  type: string
    *                  description: Comment content
    */    



    
    /**
    * @swagger
    * /comment/createcomment:
    *  post:
    *      summary: Create new comment
    *      tags: [Comments]
    *      requestBody:
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      $ref: '#/components/schemas/Comment'
    *      responses:
    *          201:
    *              description: New comment created
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/Comment'
    *          500:
    *              description: Internal error !
    */
    async createComment(req,res) {
        const newComment = commentModel({
            userId: req.body.userId,
            blog: req.body.blog,
            content: req.body.content,
            createAt: new Date()
        })
        await userModel.findByIdAndUpdate(req.body.userId,{$push: {comments:newComment._id}})
        await blogModel.findByIdAndUpdate(req.body.blog,{$push: {comments:newComment._id}})
        const saveComment = await newComment.save()
        if (!saveComment) res.status(500)
                          .json({message: 'Internal error !'})
        res.status(201)
           .json({message: saveComment})
    }

    /**
    * @swagger
    * /comment/getall:
    *  get:
    *   summary: Returns the list of all comment
    *   tags: [Comments]
    *   responses:
    *       200:
    *           description: The list of comment
    *           content:
    *               application/json:
    *                   schema:
    *                   type: array
    *                   items:
    *                       $ref: '#/components/schemas/Comment'
    *       404:
    *           description: Cannot find comment !
    */     
    async getAllComment(req,res) {
        const comments = await commentModel.find({})
        if (!comments) res.status(404)
                       .json({message: 'Cannot find comment !'})
        res.status(200)
           .json({commentList: comments})
    }

    /**
    * @swagger
    * /comment/getcomment/{id}:
    *  get:
    *   summary: Get comment by their id
    *   tags: [Comments]
    *   parameters:
    *      - in: path
    *        name: id
    *        schema: 
    *           type: string
    *        required: true
    *        description: Comment id
    *   responses:
    *       200:
    *           description: Comment found by id
    *           content: 
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/Comment'
    *       404:
    *           description: Comment cannot found
    * 
    */   
    async getComment(req,res) {
        const comment = await commentModel.findById(req.params.id)
        if (!comment) res.status(404)
                      .json({message: 'Cannot find comment !'})
        res.status(200)
           .json({comment: comment})
    }

    /** 
    * @swagger
    * /comment/updatecomment/{id}:
    *   put:
    *       summary: Update comment by their id
    *       tags: [Comments]
    *       parameters:
    *         - in: path
    *           name: id
    *           schema: 
    *               type: string
    *           required: true
    *           description: Comment id
    *       requestBody:
    *           required: true
    *           content: 
    *               application/json:
    *                   schema:
    *                       $ref: '#/components/schemas/Comment'
    *       responses:
    *           200:
    *               description: Comment has been updated
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/Comment'
    *           404:          
    *               description: Cannot find comment
    *           500:
    *               description: Internal error !
    */
    async updateComment(req,res) {
        const updateComment = await commentModel.findByIdAndUpdate(req.params.id,{$set:req.body})
        if (!updateComment) res.status(404)
                            .json({message: 'Cannot find comment !'})
        res.status(200)
           .json({message: 'Update comment !'})
    }

    /** 
    * @swagger
    * /comment/deletecomment/{id}:
    *   delete:
    *       summary: Delete comment by their id
    *       tags: [Comments]
    *       parameters:
    *         - in: path
    *           name: id
    *           schema: 
    *               type: string
    *           required: true
    *           description: Comment id
    *       responses:
    *           200:
    *               description: Comment has been deleted
    *           404:          
    *               description: Cannot find comment
    *           500:
    *               description: Internal error !
    */
    async deleteComment(req,res) {
        await userModel.findOneAndUpdate({comments:req.params.id},{$pull:{comments:deleteComment._id}})
        await blogModel.findOneAndUpdate({comments:req.params.id},{$pull:{comments:deleteComment._id}})
        const deleteComment = await commentModel.findByIdAndDelete(req.params.id)
        res.status(204)
           .json({message: 'Delete comment !'})
    }
}