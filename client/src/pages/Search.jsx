import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
	const [values, setValues] = useSearch();

	const baseUri = `${import.meta.env.VITE_API}/api/v1`;
	return (
		<Layout title="Search results">
			<div className="container">
				<div className="text-center">
					<h1>Search Results</h1>
					<h6>
						{values?.results.length < 1
							? "No Products Found"
							: `Found ${values?.results.length}`}
					</h6>
					<div className="d-flex flex-wrap mt-4">
						{values?.results.map((el) => {
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
				</div>
			</div>
		</Layout>
	);
};

export default Search;
