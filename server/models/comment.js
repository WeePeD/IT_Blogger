import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    blog: [{ type: Schema.Types.ObjectId, ref: 'Blog'}],
    content: { type: String, require: true}
})

export const commentModel = mongoose.model('Comment', commentSchema)