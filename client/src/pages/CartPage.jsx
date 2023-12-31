/* eslint-disable no-mixed-spaces-and-tabs */
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
	const [cart, setCart] = useCart();
	const [auth] = useAuth();

	const baseUri = `${import.meta.env.VITE_API}/api/v1/products`;

	const navigate = useNavigate();

	//total price
	const totalPrice = () => {
		try {
			let total = 0;
			cart?.map((item) => {
				total += item?.price;
			});
			return total.toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL",
			});
		} catch (error) {
			toast.error("Error on calculate total");
		}
	};
	//remove item
	const handleRemove = (pid) => {
		try {
			let myCart = [...cart];
			let index = myCart.findIndex((item) => item?._id === pid);
			myCart.splice(index, 1);
			setCart(myCart);
			localStorage.setItem("cart", JSON.stringify(myCart));
		} catch (error) {
			toast.error("Error on remove product from cart");
		}
	};

	return (
		<Layout>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="text-center bg-light p-2 mb-1">
							{`Hello ${auth?.token && auth?.user?.name} !`}
						</h1>
						<h4 className="text-center">
							{cart?.length > 1
								? `You have ${cart.length} items in your cart${
										auth?.token
											? ""
											: ", Plese Login to checkout"
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }`
								: `Your cart is empty`}
						</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8">
						{cart?.map((el) => {
							return (
								<div
									key={el._id}
									className="row mb-2 p-3 card flex-row"
								>
									<div className="col-md-4">
										<img
											src={`${baseUri}/product-photo/${el?._id}`}
											alt={`${el?.name}`}
											width="100px"
											height="100px"
										/>
									</div>
									<div className="col-md-8">
										<h4>{el?.name}</h4>
										<p>
											{el?.description?.substring(0, 30)}
										</p>
										<h4>R$: {el?.price}</h4>
										<button
											className="btn btn-danger"
											onClick={() =>
												handleRemove(el?._id)
											}
										>
											Remove
										</button>
									</div>
								</div>
							);
						})}
					</div>
					<div className="col-md-4 text-center">
						<h2 className="">Cart sumary</h2>
						<p>Total | Checkout | payment</p>
						<hr />
						<h4>Total : {totalPrice()}</h4>
						{auth?.user?.address ? (
							<>
								<div className="mb-3">
									<h4>Current Address</h4>
									<h5>{auth?.user?.address}</h5>
									<button
										className="btn btn-outline-warning"
										onClick={() =>
											navigate("/dashboard/user/profile")
										}
									>
										Update address
									</button>
								</div>
							</>
						) : (
							<>
								<div className="mb-3">
									{auth?.token ? (
										<button
											type="button"
											className="btn btn-outline-warning"
											onClick={() =>
												navigate(
													"/dashboard/user/profile"
												)
											}
										>
											Update Address
										</button>
									) : (
										<button
											type="button"
											className="btn btn-outline-warning"
											onClick={() =>
												navigate("/login", {
													state: "/cart",
												})
											}
										>
											Please Login to checkout
										</button>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CartPage;
