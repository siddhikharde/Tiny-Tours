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

dotenv.config();

 const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||3000;


app.get('/',getHome);
app.get('/health',getHealth);



app.post('/signUp', async (req, res)=>{
    const {name, email, phone, city, country, password}=req.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword=bcrypt.hashSync(password,salt)
          const newUser = new User({
        name,
        email,
        phone,
        city,
        country,
        password:encryptedPassword
       })
       if(!name){
        return res.json({
            success:false,
            message:"Name is required"
        })
       }
       if(!email || !email.includes('@')){
        return res.json({
            success:false,
            message:"Email is required"
        })
       }
       if(!password){
        return res.json({
            success:false,
            message:"password is required"
        })
       }
      const existingUser=await User.findOne({email});
      if(existingUser){
        return res.json({
            success:false,
            message:"User with this email already exists"
        })
      }

       try{   
        const savedUser=await newUser.save();
        return res.json({
            success:true,
            data:savedUser,
             messsage:"User registered successfully",

        })

    }catch(e){
        return res.json({
            success:false,
            message:"Error registering user",
            error:e.message,
        })

    }
})
 app.post('/login', async (req, res)=>{
    const { email, password}=req.body;
    if(!email || !password){
        return res.json({
            success:false,
            message:"email and passwoed are requirde"
        })
    }
    const existingUser=await User.findOne({email});
    if(!existingUser){
        return res.json({
            success:false,
            message:"User does not exist please signup"
        })
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    existingUser.password=undefined;
    
    if(isPasswordCorrect){
        const jwtToken=jwt.sign({
            id:existingUser.id,
            email:existingUser.email,
        },process.env.JWT_SECRET,
    {
        expiresIn:"1h"
    })
        return res.json({
            success:true,
            data:existingUser,
            message:"user login succesfull",
            token:jwtToken
        })
    }else{
        return res.json({
            success:false,
            message:"invalid email or password"
        })
    }
 })

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

