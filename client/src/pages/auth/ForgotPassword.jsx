import Layout from "../../components/Layout/Layout"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import './../styles/authStyle.css'



const ForgotPassword = () => {

    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword]= useState('')
    const [answer,setAnswer] = useState('')


    const navigate = useNavigate()



    const handleSubmit =  async (e)=>{
        e.preventDefault()
        
        try{
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`,{
                email,
                newPassword,
                answer
            })
            if(res && res.data.success){
                toast.success(res.data.message)

                navigate( '/login')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error('Algo parece errado !')
        }
    }







  return (
    <Layout>
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
                        type="text"
                        value={answer}
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your secret Answer"
                        onChange={(e)=>setAnswer(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password"
                        value={newPassword}
                        className="form-control" 
                        id="password" 
                        name="password"
                        placeholder="Enter your Password"
                        onChange={(e)=> setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" >Reset Password</button>
                
            </form>

        </div>
    </Layout>
  )
}

export default ForgotPassword