//Express
import express from 'express';
const app = express();
app.set('view engine','ejs')

//Dotenv
import dotenv from 'dotenv';
dotenv.config()

//Mongoose
import mongoose from 'mongoose';

//Import route
import router from './routes/index.js'

//Body parser
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Swagger 
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";

//Swagger option
const swaggerOption = {
    definition:{
        openapi:"3.0.0",
        info:{
            title: "It Blog Swagger",
            version: "1.0.0",
            description: "This is the it blog swagger"
        },
        servers:[
            {
                url: "http://localhost:3000"
            }
        ],
    }
    ,apis:['./controllers/*.js']
}
const specs = swaggerDoc(swaggerOption)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(specs))

//Connect to database
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Database connected !')
})
.catch((err)=>{
    console.log('False to connect'+err)
})

app.get('/',(req,res) => {
    res.redirect('/blog/getall')
})
router(app)


const listener = app.listen(process.env.PORT,()=>{
    console.log('The backend server is running !')
})