import React, { useEffect, useState, useCallback } from "react";

const noop = () => {};

const useFileReader = (options) => {
	const { method = "readAsText", onload: onloadHook = noop, hiddenFileInput } = options;
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const clearFile = useCallback(() => {
		setFile(null);
		setResult(null);
		if (hiddenFileInput) hiddenFileInput.current.value = "";
	}, [setFile, setResult]);

	useEffect(() => {
		if (!file) return;
		const reader = new FileReader(file);
		reader.onloadstart = () => {
			setLoading(true);
		};
		reader.onloadend = () => {
			setLoading(false);
		};
		reader.onload = (e) => {
			setResult(e.target.result);
			onloadHook(e.target.result);
		};
		reader.onError = (e) => {
			setError(e);
		};
		try {
			reader[method](file);
		} catch (e) {
			setError(e);
		}
	}, [file]);

	return [{ result, error, file, loading }, setFile, clearFile];
};

export default useFileReader;
