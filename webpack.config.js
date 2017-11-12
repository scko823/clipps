const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const keys = require('./secrets/keys')

const { graphcool: { websockets, api } } = keys
module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: ['babel-polyfill', './index.jsx'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx'],
	},
	module: {
		rules: [
			// JS Loader
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: '/node_modules/',
				include: [path.join(__dirname, 'src')],
			},
			// Chained SASS Loader
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
						'sass-loader',
					],
				}),
			},
			// Chained CSS Loader
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader'],
				}),
			},
			// Images
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)/,
				use: {
					loader: 'file-loader',
					options: {
						limit: 8192,
					},
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
				QUERY_API: JSON.stringify(api),
				SUBSCRIPTION_API: JSON.stringify(websockets),
			},
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].styles.css',
			allChunks: false,
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.ejs',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		port: 9000,
		historyApiFallback: true,
	},

	devtool: 'cheap-module-source-map',
}
