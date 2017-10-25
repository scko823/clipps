const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const app = express();

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/dist'));
} else {
	app.use(
		webpackDevMiddleware(compiler, {
			hot: true,
			filename: 'bundle.js',
			publicPath: '/',
			stats: {
				colors: true
			},
			historyApiFallback: true
		})
	);
	app.use(webpackHotMiddleware(compiler));
}

const server = app.listen(9090, function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
