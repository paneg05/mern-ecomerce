import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import './../styles/authStyle.css'

const Register = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')
    const [phone,setPhone] = useState('')
    const [address, setAdress] = useState('')
    const navigate = useNavigate()


    const handleSubmit =  async (e)=>{
        e.preventDefault()
        
        try{
            const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/register`,{
                name,
                email,
                password,
                phone,
                address
            })
            if(res && res.data.success){
                toast.success(res.data.message)
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error('Something went wrong')
        }
    }

  return (
    <Layout title={'Register page - Ecomerce app'}>
        
        <div className="form-container">
            <h1 className="title">Register Page</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text"
                        value={name}
                        className="form-control" 
                        id="name" 
                        name="name"
                        placeholder="Enter your Name"
                        onChange={(e)=>setName(e.target.value)}
                        required
                    />
                </div>
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
                    <input 
                        type="text"
                        value={phone}
                        className="form-control" 
                        id="phone" 
                        name="phone"
                        placeholder="Enter your phone"
                        onChange={(e)=> setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text"
                        value={address}
                        className="form-control" 
                        id="address" 
                        name="address"
                        placeholder="Enter your Address" 
                        onChange={(e)=>setAdress(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    </Layout>
  )
}

export default Register