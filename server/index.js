import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
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
 


 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
 })  

