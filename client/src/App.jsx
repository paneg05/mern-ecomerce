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
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/Routs/AdminRoute'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Products from './pages/admin/Products'
import UpdateProduct from './pages/admin/UpdateProduct'
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";


function App() {

  return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/details" element={<ProductDetails />} />
				<Route path="/search" element={<Search />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/policy" element={<Policy />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />

				{
					// rotas protegidas
				}
				<Route path="/dashboard" element={<PrivateRoute />}>
					<Route path="user" element={<Dashboard />} />
					<Route path="user/orders" element={<Orders />} />
					<Route path="user/profile" element={<Profile />} />
				</Route>
				<Route path="/dashboard" element={<AdminRoute />}>
					<Route path="admin" element={<AdminDashboard />} />
					<Route
						path="admin/create-category"
						element={<CreateCategory />}
					/>
					<Route
						path="admin/create-product"
						element={<CreateProduct />}
					/>
					<Route path="admin/users" element={<Users />} />
					<Route path="admin/products" element={<Products />} />
					<Route
						path="admin/update-product/:slug"
						element={<UpdateProduct />}
					/>
				</Route>

				<Route path="*" element={<Pagenotfound />} />
			</Routes>
		</>
  );
}

export default App
