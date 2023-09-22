import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
	const categories = useCategory();
	return (
		<Layout title={"All categories"}>
			<div className="container">
				<div className="row">
					{categories.map((c) => (
						<div
							key={c._id}
							className="col-md-6 mt-5 mb-3 gx-3 gy-3"
						>
							<Link
								className="btn btn-primary text-light"
								to={`/category/${c.slug}`}
							>
								{c.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Categories;
