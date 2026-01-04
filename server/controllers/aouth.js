import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
dotenv.config();
const postSignUp=async (req, res)=>{
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
}

const postLogin=async (req, res)=>{
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
 }

export {postSignUp, postLogin};