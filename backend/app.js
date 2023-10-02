import express from 'express';
import dotenv from 'dotenv'
const app = express()
const DATABASE_URL ='mongodb+srv://mubbashirahmad:ahmad1122@discount-app.xng6cvr.mongodb.net/discount-app?retryWrites=true&w=majority'
import connectDb from './db/connection.js'
import { errormiddle } from './middleware/error.js'
import userroute from './routes/userroute.js'
import categoryroute from './routes/categoryroute.js'
import discountroute from './routes/discountroute.js'
import storeroute from './routes/storeroute.js'
import bodyParser from 'body-parser'
import cors from 'cors' 
import cloudinary from 'cloudinary' 
import fileUpload from 'express-fileupload';
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
dotenv.config({ path: "backend/config/config.env" });
app.use(bodyParser.json());
// app.use()


app.use('/api/v1', userroute);
app.use('/api/v1', categoryroute);
app.use('/api/v1', storeroute);
app.use('/api/v1', discountroute);

 



connectDb(DATABASE_URL);
app.use(errormiddle);
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Running ${DATABASE_URL}`);
});