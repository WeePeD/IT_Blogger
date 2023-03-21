import mongoose, { Schema } from 'mongoose';

const blogSchema = new mongoose.Schema({
    blogName: {type: String},
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    content: { type: String, require: true},
    codes: [{ type: String }],
    tags: [{ type: String, lowercase: true}],
    star: { type: Boolean, default: false},
    rating: [{ type: Schema.Types.ObjectId}],
    createAt: { type: Date},
    updateAt: [{type: Date}]
})

export const blogModel = mongoose.model('Blog', blogSchema)