import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {userModel} from '../models/user.js'
import transporter from '../middlewares/transporter.js';

const registerValidator = (data) => {
    const rule = joi.object({
        userName: joi.string().min(6).max(255).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
        job: joi.string().required(),
        role: joi.string(),
        gender: joi.string()
    })
    return rule.validate(data)
}

export default class authController {

    /**
    * @swagger
    * /auth/register:
    *  post:
    *      summary: User register
    *      tags: [Authentication]
    *      requestBody:
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      type: object
    *                      properties:
    *                          userName:
    *                              type: string
    *                          email:
    *                              type: string
    *                          password:
    *                              type: string
    *                          job:
    *                              type: string
    *                          role:
    *                              type: string
    *                          gender:
    *                              type: string
    *                      required:
    *                         - email
    *                         - password
    *                         - job    
    *      responses:
    *          201:
    *              description: New user created
    *              content:        
    *                  application/json:
    *                      schema:     
    *                          $ref: '#/components/schemas/User'
    *          500:
    *              description: Internal error!
    */
    async register(req,res){
        const {err} = registerValidator(req.body)
        if (err) res.status(422)
                    .send(err.details[0].message)
        
        const checkEmailExist = await userModel.findOne({email: req.body.email})
        if (checkEmailExist) res.status(422)
                                .send('Email existed !')
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const verifiedCode = crypto.randomInt(100000,999999)
        const newUser = userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword,
            job: req.body.job,
            role: req.body.role,
            gender: req.body.gender,
            confirmationCode: verifiedCode,
            createAt: new Date()
        })
        transporter(req.body.email, verifiedCode,'register')
        const saveUser = await newUser.save()
        if (!saveUser) res.status(500)
        res.status(201)
           .json(saveUser)
    }


    /**
    * @swagger
    * /auth/login:
    *  post:
    *      summary: User login
    *      tags: [Authentication]
    *      requestBody:
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      type: object
    *                      properties:
    *                          email:
    *                              type: string
    *                          password:
    *                              type: string
    *                      required:
    *                         - email
    *                         - password
    *      responses:
    *          201:
    *              description: User login      
    *              headers: 
    *          500:
    *              description: Internal error!
    */
    async login(req,res) {
        const checkEmail = await userModel.findOne({email: req.body.email})
        if (!checkEmail) res.status(422)
                            .send('Your email is not correct !')
        const checkPassword = await bcrypt.compare(req.body.password, checkEmail.password)
        if (!checkPassword) res.status(422)
                               .send('Your password is not correct !')
        if (checkEmail.status == 'Pending') res.status(422) 
                                               .send('Please active your account first !')
        if (checkEmail.isAdmin === true) {
                const admin_token = jwt.sign({_id:checkEmail._id},process.env.TOKEN_SECRET_ADMIN, {expiresIn: 20}) 
                res.header('admin-token',admin_token)
                   .json({message:'Wellcome Wibulord',token})
        } 
        const token = jwt.sign({_id: checkEmail._id},process.env.TOKEN_SECRET, {expiresIn: 20})
        res.header('auth-token', token)
           .json({message:'You have login',token: token})
    }

    /**
     * @swagger
     * /auth/verified/{id}:
     *  post:
     *      summary: Active the account
     *      tags: [Authentication]
     *      parameters:
     *        - in: path    
     *          name: id
     *          schema:
     *              type: string
     *          required: true
     *          description: User id
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      properties:
     *                          confirmationCode:
     *                              type: string
     *                      required:
     *                          - confirmationCode
     *      responses:
     *          201:
     *              description: Account activate !
     *          404:
     *              description: Confirm code is not correct, please try again.
     *          500:
     *              description: Internal error !
     */
    async verifiedMail(req,res) {
        const checkCode = await userModel.findOneAndUpdate({_id:req.params.id,confirmationCode:req.body.confirmationCode},{status:'Active'})
        if (!checkCode) res.status(404)
                           .send('Your code is not correct !')
        res.status(201)
           .json(checkCode)
    }


    resetPassword(req,res) {
        const {id} = req.params
        const {newPassword, confirmPassword} = req.body
        if (confirmPassword != newPassword){
            res.send('Password does not match')
        }
        const user = userModel.findByIdAndUpdate(id,{$set : {password: newPassword}})
        res.send(`User ${user.userName} password has been updated.`)
    }
 
    confirmCode(req,res) {
        const {id} = req.params
        const {code} = req.body
        const checkCode = userModel.findOne({confirmationCode:code, _id: id})
        if (!checkCode){
            res.send('Wrong code')
        }
        else{
            res.redirect(`resetpass/${id}`)
        }
    }

    async resetCode(req,res) {
        const findUser = await userModel.findOne({email: req.body.email})
        if (!findUser) res.status(404)
                          .send('Your email is not correct!')
        const verifiedCode = crypto.randomInt(100000,999999)
        await findUser.updateOne({$set : {confirmationCode: verifiedCode}})
        transporter(req.body.email, verifiedCode,'forgetPass')

        res.redirect(`confirmcode/${findUser._id}`)
    }
}