import { func } from 'joi';
import mongoose, { Schema } from 'mongoose';
import slugify from "slugify"

const blogSchema = new mongoose.Schema({
    blogName: {type: String},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    content: { type: String, require: true},
    tags: [{ type: String, lowercase: true}],
    star: { type: Boolean, default: false},
    rating: [{ type: Schema.Types.ObjectId}],
    slug:{type: string, require: true, unique:true},
    createAt: { type: Date},
    updateAt: [{type: Date}]
})

blogSchema.pre("validate", function(){
    if (this.blogName) this.slug = slugify(this.blogName, {lowercase: true, strict:true})
    next()
})

export const blogModel = mongoose.model('Blog', blogSchema)