import merge from 'webpack-merge'

import CompressionPlugin from 'compression-webpack-plugin'
// import webpack from 'webpack'
// import MinifyPlugin from 'babel-minify-webpack-plugin'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

// import ClosureCompilerPlugin from 'webpack-closure-compiler'
import common from './webpack.config.common.babel'

const prodConfig = merge(common, {
	plugins: [
		// new MinifyPlugin({
		//     removeConsole: true,
		//     removeDebugger: true,
		// }),
		new UglifyJsPlugin({
			cache: true,
		}),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
	],

	devtool: 'source-map',
})
export default prodConfig
