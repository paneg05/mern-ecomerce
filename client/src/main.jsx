
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import 'antd/dist/reset.css'
import './index.css'

import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from "./context/search.jsx";
import { CartProvider } from "./context/cart.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<SearchProvider>
			<CartProvider>
				<BrowserRouter>
					<Toaster />
					<App />
				</BrowserRouter>
			</CartProvider>
		</SearchProvider>
	</AuthProvider>
);
