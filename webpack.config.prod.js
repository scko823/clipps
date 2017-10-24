const webpack = require('webpack');
const baseConfig = require('./webpack.config');

const prodConfig = Object.assign({}, baseConfig);

prodConfig.entry = ['./index.jsx'];

prodConfig.plugins = prodConfig.plugins.slice().concat([
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	}),
	new webpack.optimize.UglifyJsPlugin()
]);

module.exports = prodConfig;
