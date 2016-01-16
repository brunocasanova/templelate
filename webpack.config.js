module.exports = {
	entry: "./lib/frontend/src/js/public",

	output: {
		path: __dirname,
		filename: 'lib/frontend/src/js/bundle/index.js',
	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" }
		]
	},

};
