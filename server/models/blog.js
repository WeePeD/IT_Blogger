import mongoose, { Schema } from 'mongoose';

const blogSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    content: { type: String, require: true}
})

export const blogModel = mongoose.model('Blog', blogSchema)