import dotenv from 'dotenv';
dotenv.config();

const getHome=(req,res)=>{
   return res.json({message:"Welcome to Tiny Tours Server"});
}

const getHealth=(req,res)=>{
    res.json({
        status:"ok",
        msg:"Server is healthy",
        success:"true"
    })
}

export {getHealth, getHome};