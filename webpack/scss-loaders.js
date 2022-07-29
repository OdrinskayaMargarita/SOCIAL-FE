module.exports = (mode = "development") => [
	{
		loader: "css-loader",
		options: {
			sourceMap: mode !== "production",
			importLoaders: 1,
		},
	},
	{
		loader: "postcss-loader",
		options: {
			sourceMap: mode !== "production",
		},
	},
];
