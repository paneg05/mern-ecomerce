import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const CategoryProduct = () => {
	const navigate = useNavigate();
	const baseUri = `${import.meta.env.VITE_API}/api/v1/products`;

	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const test = false;
	const params = useParams();

	useEffect(() => {
		params?.slug && getProductsByCategory();
	}, []);

	const getProductsByCategory = async () => {
		try {
			const { data } = await axios.get(
				`${baseUri}/product-category/${params.slug}`
			);
			setProducts(data?.products);
			setCategory(data?.category);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong on get product by category");
		}
	};

	return (
		<Layout>
			<div className="container mt-3">
				<h4 className="text-center">Category - {category?.name}</h4>
				<h6 className="text-center">{products?.length} result found</h6>

				<div className="row">
					<div className="col-md-9 offset-1">
						<div className="d-flex flex-wrap">
							{products.map((el) => {
								return (
									<div
										key={el._id}
										className="card m-2"
										style={{ width: "18rem" }}
									>
										<img
											src={`${baseUri}/product-photo/${el._id}`}
											className="card-img-top"
											alt={el.name}
										/>
										<div className="card-body">
											<h5 className="card-title">
												{el.name}
											</h5>
											<p className="card-text">
												{el.description.substring(
													0,
													30
												)}
											</p>
											<p className="card-text">
												R$ {el.price}
											</p>
											<button
												className="btn btn-primary ms-1"
												onClick={() =>
													navigate(
														`/product/${el.slug}`
													)
												}
											>
												More details
											</button>
											<button className="btn btn-secondary ms-1">
												Add to cart
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CategoryProduct;
