import { User } from "../models/user.model.js";
import bcypt from "bcrypt"
import { generateToken } from "../utils/generateTokens.js";
export const register = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({
           $or: [{username},{email}]
        });
    
        if(user){
            return res.status(409).json({
                success:false,
                message:"User already exist"
            })
        }
        const hashedPassword = await bcypt.hash(password,10);
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
        if(!newUser){
            return res.status(400).json({
                success:false,
                message:"User is not created"
            })
        }
        return res.status(201).json({
            success:true,
            message:"Account has created Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to Register"
        })
    }
}

export const login = async(req,res)=>{
 try {
    const {email,password} = req.body
    if(!email || !password){
       return res.status(401).json({
           success:false,
           message:"All Fileds are required"
       })
    }
    const user = await User.findOne({email});
    if(!user){
       return res.status(400).json({
           success:false,
           message:"User not found"
       })
    }
    const isPasswordValid = await bcypt.compare(password,user.password)
    if(!isPasswordValid){
       return res.status(400).json({
           success:false,
           message:"Password does not match"
       })
    }
    await generateToken(res,user,`Welcome back ${user.username}`)
 } catch (error) {
    console.log("Error");
      return res.status(500).json({
          success:false,
          message:"Failed to Login"
     })
 }
}

export const logout = async(_,res)=>{
    try {
       return res.status(201).cookie("token","",{maxAge:0}).json({
        success:true,
        message:"Logout Successfully"
       })
    } catch (error) {
        console.log("Error");
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
       }) 
    }
}

export const getUserProfile = async(req,res)=>{
   try {
     const userId = req.id;
     const user = await User.findById(userId).select("-password")
     if(!user){
        return res.status(404).json({
            message:"Profile not found"
        })
     }
     return res.status(201).json({
        success:true,
        user
     })
   } catch (error) {
    console.log("Error");
        return res.status(500).json({
            success:false,
            message:"Failed to get user"
       }) 
   }
}