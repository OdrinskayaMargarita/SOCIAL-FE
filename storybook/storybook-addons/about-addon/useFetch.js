import { useState, useEffect } from "react";

function useFetch(url, initialValue) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(initialValue);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((res) => res.json())
			.then(setData)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	return [data, loading, error];
}

export default useFetch;
