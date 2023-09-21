import { useState, useContext, createContext } from "react";

const searchContext = createContext();

// eslint-disable-next-line react/prop-types
const SearchProvider = ({ children }) => {
	const [values, setValues] = useState({
		keyword: "",
		results: [],
	});

	return (
		<searchContext.Provider value={[values, setValues]}>
			{children}
		</searchContext.Provider>
	);
};

const useSearch = () => useContext(searchContext);

export { useSearch, SearchProvider };
