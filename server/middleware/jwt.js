import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const checkJwtToken=(req,res,next)=>{
    const {authorization}=req.headers;
    const jwtToken=authorization && authorization.split(" ")[1];
    try{
        const decode=jwt.verify(jwtToken,process.env.JWT_SECRET);
        req.user=decode;
        console.log(decode)
        next();
    }catch(e){
        return res.json({
            message:"invalid or missing token"
        })
    }
}

export {checkJwtToken};