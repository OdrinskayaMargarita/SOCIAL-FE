module.exports = {
	presets: [
		[
			"next/babel",
			{
				"preset-env": {
					targets: {
						browsers: ["ie 11"],
					},
				},
			},
		],
	],
};
