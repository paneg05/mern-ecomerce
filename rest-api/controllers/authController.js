import userModel from './../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

import  Jwt  from 'jsonwebtoken'
import colors from 'colors'

export const registerController = async (req,res)=>{
    try{
        const {name,email,phone,password,address,role} = req.body
        //validations
        if(!name){
            return res.send({error:'Name is Required'})
        }if(!email){
            return res.send({error:'Email is Required'})
        }if(!phone){
            return res.send({error:'Phone is Required'})
        }if(!password){
            return res.send({error:'Password is Required'})
        }if(!address){
            return res.send({error:'Address is Required'})
        }if(!role){
            return res.send({error:'Role is Required'})
        }

        //check user
        const existingUser = await userModel.findOne({email})

        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel(
                {
                    name,
                    email,
                    phone,
                    password:hashedPassword,
                    address,role
                }
            ).save()
        
        res.status(201).send({
            success:true,
            message: 'User Registred',
            user
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            sucess:false,
            messagem:'Erro in Registration',
            err
        })
    }
}

//POST LOGIN
export const loginController = async (req,res)=>{
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Username or Password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                messegae:'Email is not registred'
            })
        }
        
        const match = await comparePassword(password,user.password)
        
        if(!match){
            return res.status(200).send({
                success: false,
                message:'Invalid Password or Email'
            })
        }
        //token
        const token = await Jwt.sign({_id:user.id}, process.env.JWT_SECRET,
            {
                expiresIn:'7d'
            })
            res.status(200).send({
                success:true,
                message:'login succesfuly',
                user:{
                    mane:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,

                },
                token,
            })
    }catch(err){
        console.log(`${err}`.bgRed.white)
        res.status(500).send({
            success:false,
            message:'erro in login',
            err
        })
    }

}

export const testController = async (req,res) =>{
    res.send('test')
}
