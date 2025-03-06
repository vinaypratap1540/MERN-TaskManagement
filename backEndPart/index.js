import express from "express"
import dotenv from "dotenv"
import dbConnect from "./database/dbConnect.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import cors from "cors"
dotenv.config({
    path:"./.env"
})
const app = express()
app.use(cors({
   origin:"http://localhost:3000",
   credentials:true
}))
app.use(express.json())
app.use(cookieParser())
dbConnect()
.then(()=>{app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is listening ${process.env.PORT}`)
 })
})
.catch((error)=>{
    console.log("MongoDB Connecion Failed",error)
})

app.use("/api/v1/users",userRoute)