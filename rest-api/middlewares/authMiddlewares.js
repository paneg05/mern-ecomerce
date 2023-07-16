import JWT from "jsonwebtoken";
import colors from "colors"
import userModel  from "../models/userModel.js";
//Protected Routes token base
export const requireSignIn = async (req,res,next)=>{
   
    try{
        const authHeader =await req.headers.authorization
        const token = authHeader.split(' ')[1]
        const decode = JWT.verify(token, process.env.JWT_SECRET)
        req.user= decode
        next()
    }catch(err){
        console.log(` ${err} `.bgRed.white)
        res.status(400).send({
            success:false,
            message:' Unauthorized Access '
        })
    }
}

//admin access
export const isAdmin = async (req,res,next)=>{
    try{
        const user = await userModel.findById(req.user._id)
        
        if(user.role !== 1){
            
            return res.status(401).send({
                success:false,
                message:' Unauthorized Access '
            })
        }else{
            
            next()
        }
    }catch(err){
        console.log(`${err}`.bgRed.white)
        res.status(401).send({
            success:false,
            message:' Error in admin middleware ',
            err:` ${err} `
        })
    }
}