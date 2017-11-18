import webpack from 'webpack'
import path from 'path'
import HtmkWebpackPlugin from 'html-webpack-plugin'
import keys from './secrets/keys.json'

import MinifyPlugin from 'babel-minify-webpack-plugin'

const { graphcool: { websockets, api } } = keys
export default {
	entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.jsx')],
	output: {
		filename: '[name].[hash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
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
			// 	use: ExtractTextPlugin.extract({
			// 		use: [
			// 			{
			// 				loader: 'css-loader',
			// 				options: {
			// 					importLoaders: 1,
			// 				},
			// 			},
			// 			'sass-loader',
			// 		],
			// 	}),
			// },
			// // Chained CSS Loader
			// {
			// 	test: /\.css$/,
			// 	use: ExtractTextPlugin.extract({
			// 		use: ['css-loader'],
			// 	}),
			// },
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
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmkWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.ejs'),
			inject: true,
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new MinifyPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		staticOptions: {
			redirect: false,
		},
		compress: true,
		hot: true,
		port: 9000,
		historyApiFallback: {
			rewrites: [
				{
					from: /^\/board\//,
					to: '/index.html',
				},
				{
					from: /^\/.*\/index.js$/,
					to: '/index.js',
				},
			],
		},
	},

	devtool:
		process.env.NODE_ENV === 'production'
			? 'cheap-module-source-map'
			: 'source-map',
}
