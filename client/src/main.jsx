
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import 'antd/dist/reset.css'
import './index.css'

import { AuthProvider } from './context/auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </AuthProvider>
)
