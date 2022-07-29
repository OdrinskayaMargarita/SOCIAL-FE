const path = require("path");

const resolveRelativePath =
	(rootFolder) =>
	([name, relativePath]) => ({
		[name]: path.resolve(rootFolder, relativePath),
	});

const aliases =
	(nameMapping, rootFolder = process.cwd()) =>
	(config) => {
		// eslint-disable-next-line no-param-reassign
		config.resolve = config.resolve || {};
		const { resolve } = config;
		resolve.alias = Object.assign(
			resolve.alias || {},
			...Object.entries(nameMapping).map(resolveRelativePath(rootFolder)),
		);
		return config;
	};

module.exports = aliases;
