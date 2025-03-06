import jwt from "jsonwebtoken";

export const generateToken= async(res,user,message)=>{
   const token = jwt.sign(
    {
        userId:user._id
    },
    process.env.SECRET_KEY,
    {
        expiresIn:"1d"
    }
   )
   const option = {
    httpOnly:true,
    secure:true
   }
   return res
   .status(201)
   .cookie("token",token,option)
   .json({
    success:true,
    user,
    message
   })
}