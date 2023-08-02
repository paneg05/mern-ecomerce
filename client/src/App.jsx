import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import About from './pages/About'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routs/Private'
import ForgotPassword from './pages/auth/ForgotPassword'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />

        
        {
          // rotas protegidas
        }
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>} />
        </Route>

        
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
    </>
  )
}

export default App
