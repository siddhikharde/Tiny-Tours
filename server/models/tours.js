import {model,Schema} from 'mongoose';

const toursSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    cites:{
        type:[String],
        default:[],
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date,
    },
    photos:{
        type:[String],
        default:[]
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

const Tour=model("Tour", toursSchema);
export default Tour;