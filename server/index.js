import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/user.js';
import connectDB from './db.js';

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

app.post('/signUp', async (req, res)=>{
    const {name, email, phone, city, country, password}=req.body;
          const newUser = new User({
        name,
        email,
        phone,
        city,
        country,
        password
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
    const existingUser=await User.findOne({email, password}).select("-password");
    if(existingUser){
        return res.json({
            success:true,
            data:existingUser,
            message:"user login succesfull"
        })
    }else{
        return res.json({
            success:false,
            message:"user not exists please signup"
        })
    }


 })


 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
 })  

