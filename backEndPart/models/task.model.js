import mongoose,{Schema} from "mongoose";

const taskSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  dueDate:{
    type:Date,
    required:true
  },
  complete:{
    type:Boolean,
    default:false
  },
  creator:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
})

export const Task = mongoose.model("Task",taskSchema)