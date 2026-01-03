import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URI);
        if(conn){
            console.log("Mongodb connected successfully");
        }

    }catch(e){
        console.log("Error connecting to Mongodb",e);
    }

};
export default connectDB;