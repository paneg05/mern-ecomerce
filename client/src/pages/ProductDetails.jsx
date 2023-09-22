import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
	const baseUri = `${import.meta.env.VITE_API}/api/v1/products`;

	const params = useParams();

	const [product, setProduct] = useState({});
	const [relatedProducts, setReletedProducts] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (params?.slug) getProduct();
	}, [params?.slug]);
	const getProduct = async () => {
		try {
			const { data } = await axios.get(
				`${baseUri}/get-product/${params.slug}`
			);
			setProduct(data?.product);
			getSimilarProducts(data?.product._id, data?.product.category._id);
		} catch (error) {
			console.error(error);
		}
	};

	const getSimilarProducts = async (pid, cid) => {
		try {
			const { data } = await axios.get(
				`${baseUri}/related-products/${pid}/${cid}`
			);
			console.log(pid);
			setReletedProducts(data?.products);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout title="Product details">
			<div className="row container mt-2">
				<div className="col-md-6">
					<img
						src={`${baseUri}/product-photo/${product._id}`}
						className="card-img-top"
						alt={product?.name}
						height={"300px"}
						width={"350px"}
					/>
				</div>
				<div className="col-md-6 ">
					<h1 className="text-center">Product details</h1>
					<h6>Name: {product?.name}</h6>
					<h6>Description: {product?.description}</h6>
					<h6>Price: {product?.price}</h6>
					<h6>Category: {product?.category?.name}</h6>
					<h6>Shipping: {product?.shipping ? "yes" : "no"}</h6>
					<button className="btn btn-secondary ms-1">
						ADD TO CART
					</button>
				</div>
			</div>
			<hr />
			<div className="row">
				<h6 className="text-center">
					{relatedProducts.length > 0
						? "Similar Products"
						: "No similar products found"}
				</h6>

				<div className="d-flex flex-wrap">
					{relatedProducts.map((el) => {
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
									<h5 className="card-title">{el.name}</h5>
									<p className="card-text">
										{el.description.substring(0, 30)}
									</p>
									<p className="card-text">R$ {el.price}</p>
									<button className="btn btn-secondary ms-1">
										Add to cart
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default ProductDetails;
