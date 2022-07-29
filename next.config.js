/* eslint-disable no-param-reassign */
const webpack = require("webpack");
// const { i18n } = require('./next-i18next.config');
require("dotenv").config();

module.exports = {
	pageExtensions: ["new.js"],
	webpack: (config) => {
		config.plugins.push(new webpack.EnvironmentPlugin(process.env));
		return config;
	},
	async redirects() {
		return [
			{
				source: "/social",
				destination: "/social/groups",
				permanent: true,
			},
		];
	},
};
