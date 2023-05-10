import mongoose, { Schema } from 'mongoose';
import slugify from "slugify";
import {marked} from "marked";
import creteDomPurifier from "dompurify";
import {JSDOM} from "jsdom";

const dompurify = creteDomPurifier(new JSDOM().window)


const blogSchema = new mongoose.Schema({
    blogName: {type: String},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    content: { type: String, require: true},
    tags: [{ type: String, lowercase: true}],
    star: { type: Boolean, default: false},
    rating: [{ type: Schema.Types.ObjectId}],
    slug:{type: String, require: true, unique:true},
    createAt: { type: Date},
    updateAt: [{type: Date}],
    sanitizedHtml : {type: String, require: true}
})

blogSchema.pre("validate", function(){
    if (this.blogName) {this.slug = slugify(this.blogName, {lowercase: true, strict:true})}
    if (this.content) {this.sanitizedHtml = dompurify.sanitize(marked(this.content))}
})

export const blogModel = mongoose.model('Blog', blogSchema)