import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/user.js';
import connectDB from './db.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
dotenv.config();

 const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||3000;


app.get('/',(req,res)=>{
   return res.json({message:"Welcome to Tiny Tours Server"});
})
app.get('/health',(req,res)=>{
    res.json({
        status:"ok",
        msg:"Server is healthy",
        success:"true"
    })
})

const checkJwtToken=(req,res,next)=>{
    const {authorization}=req.headers;
    const jwtToken=authorization && authorization.split(" ")[1];
    try{
        const decode=jwt.verify(jwtToken,process.env.JWT_SECRET);
        console.log(decode)
        next();
    }catch(e){
        return res.json({
            message:"invalid or missing token"
        })
    }
}

app.get('/api_v1', checkJwtToken,(req, res)=>{
    return res.json({
        message:"v1 is working"
    })
})

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



 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
 })  

