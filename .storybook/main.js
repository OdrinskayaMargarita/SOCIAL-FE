//const webpack = require("webpack");
const path = require("path");
const scssLoaders = require("../webpack/scss-loaders");
//const { version, release } = require("../version");
const aliases = require("../webpack/aliases");

module.exports = {
	stories: [
		//"../components/global/**/*.stories.js",
		//"../components/atoms/**/*.stories.js",
		//"../components/molecules/**/*.stories.js",
		//"../components/organisms/**/*.stories.js",
		//"../components/pages/**/*.stories.js",
		"../storybook/**/*.stories.js",
	],
	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-links",
		"@storybook/addon-docs",
		"@storybook/addon-postcss",
		"@storybook/addon-storysource",
		"@storybook/addon-viewport/register"
		//"@storybook/addon-backgrounds"
	],

	webpackFinal: config => {
		config.node = {fs: 'empty'};
		config.module.rules.push({
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			use: [
				{
					loader: 'file-loader',
					query: {
						name: '[name].[ext]'
					}
				}
			],
			include: path.resolve(__dirname, '../')
		});
		config.module.rules.push(
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", ...scssLoaders("development")],
				include: path.resolve(__dirname, '../')
			});
		config.resolve.roots = [
			path.resolve(__dirname, '../storybook/public'),
			'node_modules',
		];
		if (process.env.CI) {
			config.plugins = config.plugins.filter(
				plugin => plugin.constructor.name !== "ProgressPlugin"
			);
		}

	/*	config.plugins.push(
			new webpack.DefinePlugin({
				"global.PACKAGE_VERSION": JSON.stringify(version),
				"global.RELEASE_NAME": JSON.stringify(release)
			})
		);*/

		aliases(config);

		return config;
	}
};
