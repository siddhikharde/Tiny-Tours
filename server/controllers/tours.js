import dotenv from 'dotenv';
import Tour from './../models/tours.js';
dotenv.config();
const postTours=async (req, res)=>{
   const {title, description, startDate, endDate, photos, cites} =req.body;
   const newTour= new Tour({
    title,
    description,
    cites,
    startDate,
    endDate,
    photos,
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
const putTours=async (req, res)=>{
    const user=req.user;
    const userId=user.id;
    const {id}=req.params;

    const tour=await Tour.findById(id);
    if(!tour){
        return res.json({
            success:false,
            msg:'tour not found',
            data:null
        })
    }
    if(tour.user.toString() !== userId){
        return res.json({
            success:false,
            message:"unauothorized to update this tour",
            data:null
        })
    }
     const {title, description, startDate, endDate, photos, cites} =req.body;
     const updatedTour=await Tour.updateOne({_id:id},{
        title,
        description, 
        startDate, 
        endDate, 
        photos, 
        cites
     });
  
     return res.json({
        success:true,
        message:"tour updated succesfully",
        data:updatedTour,
     })

}

const getTourById =async (req, res)=>{
    const {id}=req.params;
    const tour=await Tour.findById(id).populate("user");
    if(!tour){
        return res.json({
            success:false,
            message:"tour not found",
            data:null
        })
     }else{
       return res.json({
            success:true,
            message:"tour feched successfully",
            data:tour,
        })
    }
}
    

export {postTours,getTours,putTours, getTourById}