import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		let existingCartItem = localStorage.getItem("cart");
		existingCartItem && setCart(JSON.parse(existingCartItem));
	}, []);

	return (
		<CartContext.Provider value={[cart, setCart]}>
			{children}
		</CartContext.Provider>
	);
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
