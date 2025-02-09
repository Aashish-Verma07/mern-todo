import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique:true,
    },
    password:{
        type:String,
        require: true
    },
},{timestamps:true});

export default mongoose.model('users',userSchema)