import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
       const connectInstance=await mongoose.connect(`${process.env.MONGO_URI}`)
       console.log(`MongoDb is Connected !! DB Host is ${connectInstance.connection.host}`)
    } catch (error) {
       console.log("MongoDB Connection Error",error)
       process.exit(1) 
    }
}

export default dbConnect