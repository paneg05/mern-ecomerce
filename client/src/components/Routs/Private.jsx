import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useLocation } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

export default function PrivateRoute (){
    const [ok,setOk] = useState(false)
    const {auth} = useAuth()

    const location = useLocation()
    const rout = location.pathname.split('/')

    if(!rout[2]){
        return <Navigate to='/'/>
    }
    
    useEffect(()=>{
        const authCheck =async () =>{
            const res = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user-route`,)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
            console.log(res.data.ok)
        }

        if(auth?.token) authCheck()
    },[auth?.token])

    

    return ok ? <Outlet /> : <Spinner/>
}
