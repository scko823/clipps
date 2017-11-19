import merge from 'webpack-merge'
// import MinifyPlugin from 'babel-minify-webpack-plugin'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

import common from './webpack.config.common.babel'

const prodConfig = merge(common, {
	plugins: [
		// new MinifyPlugin({
		// 	removeConsole: true,
		// 	removeDebugger: true,
		// }),
		new UglifyJsPlugin({
			cache: true,
		}),
	],

	devtool: 'source-map',
})
export default prodConfig
