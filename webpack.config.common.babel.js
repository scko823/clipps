/* eslint prefer-destructuring:  0 */
import webpack from 'webpack';
import path from 'path';
import HtmkWebpackPlugin from 'html-webpack-plugin';
import endpoints from './endpoints.json';

const { graphcool, dev } = endpoints;

let websockets;
let api;
if (process.env.NODE_ENV === 'development') {
	websockets = dev.websockets;
	api = dev.api;
} else {
	websockets = graphcool.websockets;
	api = graphcool.api;
}
const htmlPluginDefaultOpts = {
	template: path.join(__dirname, 'src', 'index.ejs'),
	inject: true
};
export default {
	entry: {
		app: ['babel-polyfill', path.join(__dirname, 'src', 'index.jsx')]
	},
	output: {
		filename: '[name].[hash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx']
	},
	module: {
		rules: [
			// JS Loader
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: '/node_modules/',
				include: [path.join(__dirname, 'src')]
			},
			// Images
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)/,
				use: {
					loader: 'file-loader',
					options: {
						limit: 8192
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
				QUERY_API: JSON.stringify(api),
				SUBSCRIPTION_API: JSON.stringify(websockets)
			}
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmkWebpackPlugin({ ...htmlPluginDefaultOpts }),
		new HtmkWebpackPlugin({
			...htmlPluginDefaultOpts,
			filename: '200.html'
		}),

		new webpack.NamedModulesPlugin()
	]
};
