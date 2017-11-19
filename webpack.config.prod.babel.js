import merge from 'webpack-merge'
import webpack from 'webpack'
import path from 'path'
import CompressionPlugin from 'compression-webpack-plugin'
// import webpack from 'webpack'
// import MinifyPlugin from 'babel-minify-webpack-plugin'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

// import ClosureCompilerPlugin from 'webpack-closure-compiler'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import common from './webpack.config.common.babel'

const prodConfig = merge(common, {
	entry: {
		highlight: ['react-highlight'],
		react: [
			'react',
			'react-dom',
			'recompose',
			'react-router',
			'react-router-dom',
			'history',
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['highlight', 'react'],
		}),
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
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: path.join(
				'..',
				'bundle-size',
				`report-${new Date().toISOString()}.html`,
			),
			openAnalyzer: true,
			generateStatsFile: true,
			statsFilename: 'stats.json',
			statsOptions: null,
			logLevel: 'info',
		}),
	],

	devtool: 'source-map',
})
export default prodConfig
