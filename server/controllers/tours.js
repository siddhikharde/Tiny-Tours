import dotenv from 'dotenv';
import Tour from './../models/tours.js';
dotenv.config();
const postTours=async (req, res)=>{
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

}

const getTours=async (req, res)=>{
    const getTours=await Tour.find({user:req.user.id}).populate("user")
    return res.json({
        success:true,
        message:"toures feched succesfully",
        data:getTours,
    })
}

export {postTours,getTours}