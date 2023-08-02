import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import './../styles/authStyle.css'
import  {useAuth} from './../../context/auth'


const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    const handleSubmit =  async (e)=>{
        e.preventDefault()
        
        try{
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`,{
                email,
                password,

            })
            if(res && res.data.success){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate( '/')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error('Algo parece errado !')
        }
    }







  return (
    <Layout title={'Register page - Ecomerce app'}>
        
        <div className="form-container">
            <h1 className="title">Login Page</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        value={email}
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your Email"
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password"
                        value={password}
                        className="form-control" 
                        id="password" 
                        name="password"
                        placeholder="Enter your Password"
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" >Login</button>
                </div>
                
                <button type="button" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>Forgot Password</button>
            </form>

        </div>
    </Layout>
  )
}

export default Login