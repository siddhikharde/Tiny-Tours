import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/user.js';
import connectDB from './db.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tour from "./models/tours.js";
import { checkJwtToken } from './middleware/jwt.js';
import { getHealth,getHome } from './controllers/home.js';
import { postLogin,postSignUp } from './controllers/aouth.js';

dotenv.config();

 const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||3000;


app.get('/',getHome);
app.get('/health',getHealth);



app.post('/signUp',postSignUp )
 app.post('/login',postLogin )

app.post('/tours',checkJwtToken, async (req, res)=>{
   const {title, description, startDate, endDate, cites} =req.body;
   const newTour= new Tour({
    title,
    description,
    cites,
    startDate,
    endDate,
    user:req.user.id,
   })
   try{
    const savedTour=await newTour.save();
    return res.json({
        success:true,
        message:"Tours saved successfully",
        data:savedTour,
    })

   }catch(e){
    return res.json({
         success:false,
     message:"erroe while storing a tour",
     error:e.message,
     data:null
    })
     

   }

})

app.get('/tours', checkJwtToken, async (req, res)=>{
    const getTours=await Tour.find({user:req.user.id}).populate("user")
    return res.json({
        success:true,
        message:"toures feched succesfully",
        data:getTours,
    })
})

 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
 })  

