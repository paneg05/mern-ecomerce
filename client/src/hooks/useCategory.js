import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
	const [categories, setCategories] = useState([]);
	const baseUri = `${import.meta.env.VITE_API}/api/v1/category`;
	const getCategories = async () => {
		try {
			const { data } = await axios.get(`${baseUri}/get-categories`);
			setCategories(data?.category);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	return categories;
}
