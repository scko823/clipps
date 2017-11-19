import webpack from 'webpack'
import path from 'path'
import HtmkWebpackPlugin from 'html-webpack-plugin'
import keys from './secrets/keys.json'

const { graphcool: { websockets, api } } = keys
export default {
	entry: {
		app: ['babel-polyfill', path.join(__dirname, 'src', 'index.jsx')],
	},
	output: {
		filename: '[name].[hash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
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
	],
}
