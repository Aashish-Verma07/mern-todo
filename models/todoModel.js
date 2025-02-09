import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
    },
    description: {
       type: String,
       required: true,
    },
    completed: {
        type:Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
      },
    
},{timestamps:true});

export default mongoose.model('todo',todoSchema);