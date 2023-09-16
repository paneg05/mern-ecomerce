import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [checked, setChecked] = useState([]);
	const [radio, setRadio] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const apiUri = `${import.meta.env.VITE_API}/api/v1/`;

	const baseUri = `${import.meta.env.VITE_API}/api/v1`;

	useEffect(() => {
		getAllCategories();
		getTotal();
	}, []);

	const getAllProducts = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`${baseUri}/products/product-list/${page}`
			);

			setLoading(false);
			setProducts(data.products);
		} catch (err) {
			setLoading(false);
			console.error(err);
			toast.error("something went wrong");
		}
	};

	//load more
	const loadMore = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`${baseUri}/products/product-list/${page}`
			);
			setProducts([...products, ...data?.products]);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error("something went wrong on loading");
		}
	};

	useEffect(() => {
		if (page === 1) return;
		loadMore();
		console.log(products);
	}, [page]);

	const getAllCategories = async () => {
		try {
			const allCategoriesUri = `${apiUri}category/get-categories`;

			const { data } = await axios.get(allCategoriesUri);

			if (data?.success) {
				setCategories(data?.category);
			}
			console.log(categories);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong in getting category");
		}
	};

	//get total count
	const getTotal = async () => {
		try {
			const { data } = await axios.get(`${apiUri}products/product-count`);
			setTotal(data?.total);
		} catch (error) {
			console.error(error);
			toast.error("something went wrong while counting products");
		}
	};

	const handleFilter = (value, id) => {
		console.log(value, id);
		let all = [...checked];
		if (value) {
			all.push(id);
		} else {
			all = all.filter((c) => c !== id);
		}

		setChecked(all);
	};

	useEffect(() => {
		if (!checked.length || !radio.length) getAllProducts();
	}, [checked.length, radio.length]);

	useEffect(() => {
		if (checked.length || radio.length) filteredProducts();
	}, [checked, radio]);

	//get filters
	const filteredProducts = async () => {
		try {
			const { data } = await axios.post(
				`${apiUri}products/filter-product`,
				{
					checked,
					radio,
				}
			);
			setProducts(data?.products);
		} catch (error) {
			console.error(error);
			toast.error("Error in filtering productcs");
		}
	};

	return (
		<Layout title="Home - Ecomerce app">
			<div className="row">
				<div className="col-md-2">
					<h4 className="text-center mt-4">filter by category</h4>
					<div className="d-flex flex-column">
						{categories?.map((c) => {
							return (
								<Checkbox
									key={c._id}
									onChange={(e) =>
										handleFilter(e.target.checked, c._id)
									}
								>
									{c.name}
								</Checkbox>
							);
						})}
					</div>
					<h4 className="text-center mt-4">filter by Price</h4>
					<div className="d-flex flex-column">
						{
							<Radio.Group
								onChange={(e) => setRadio(e.target.value)}
							>
								{Prices?.map((e) => {
									return (
										<div key={e._id}>
											<Radio value={e.array}>
												{e.name}
											</Radio>
										</div>
									);
								})}
							</Radio.Group>
						}
					</div>
					<div className="d-flex flex-column">
						<button
							className="btn btn-danger"
							onClick={() => window.location.reload()}
						>
							RESET FILTERS
						</button>
					</div>
				</div>
				<div className="col-md-10">
					<h1 className="text-center">All products</h1>

					<div className="d-flex flex-wrap">
						{products.map((el) => {
							return (
								<div
									key={el._id}
									className="card m-2"
									style={{ width: "18rem" }}
								>
									<img
										src={`${baseUri}/products/product-photo/${el._id}`}
										className="card-img-top"
										alt={el.name}
									/>
									<div className="card-body">
										<h5 className="card-title">
											{el.name}
										</h5>
										<p className="card-text">
											{el.description.substring(0, 30)}
										</p>
										<p className="card-text">
											R$ {el.price}
										</p>
										<button className="btn btn-primary ms-1">
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
					<div className="m-2 p-3">
						{products && products.length < total && (
							<button
								className="btn btn-warning"
								onClick={(e) => {
									e.preventDefault();
									setPage(page + 1);
								}}
							>
								{loading ? "Loading..." : "Load More"}
							</button>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
