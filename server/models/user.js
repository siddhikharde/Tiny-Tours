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
    password:{
        type:String,
        required:true
    }
});

const user=model("User", userScheama);

export default user;