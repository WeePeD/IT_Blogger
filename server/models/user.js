import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    userName : { type: String, min: 6, max: 8},
    email: { type: String, require: true},
    password: { type: String, require: true, min: 10, max: 255},
    isAdmin: { type: Boolean, default: false},
    gender: { type: String, enum:['Male','Female','Other']},
    status: { type: String, enum:['Pending','Active'],default: 'Pending'},
    confirmationCode: { type: String},
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    skills: [{ type: String}],
    job: { type: String},
    role: { type: String},
    followers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    stars: { type: Number}
})

export const userModel = mongoose.model('User', userSchema)