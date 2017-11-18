import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import common from './webpack.config.common.babel'

const devConfig = merge(common, {
	plugins: [new webpack.HotModuleReplacementPlugin()],
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
	devtool: 'cheap-module-source-map',
})

export default devConfig
