import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useLocation } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

export default function PrivateRoute (){
    const [ok,setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    const location = useLocation()
    const rout = location.pathname.split('/')

    
    
    useEffect(()=>{
        const authCheck =async () =>{
            const res = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/user-route`,)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
            if(!rout[2]){
                setOk(false)
            }
        }

        if(auth?.token) authCheck()
    },[auth?.token])

    

    return ok ? <Outlet /> : <Spinner path="/"/>
}
