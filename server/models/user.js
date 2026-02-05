import { Schema, model } from "mongoose";

const userScheama=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    profilePhoto:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    }
});

const User=model("User", userScheama);

export default User;