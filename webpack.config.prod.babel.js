import merge from 'webpack-merge';
import webpack from 'webpack';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import OfflinePlugin from 'offline-plugin';

// import webpack from 'webpack'
// import MinifyPlugin from 'babel-minify-webpack-plugin'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

// import ClosureCompilerPlugin from 'webpack-closure-compiler'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import common from './webpack.config.common.babel';

const prodConfig = merge(common, {
	entry: {
		highlight: ['react-highlight'],
		react: ['react', 'react-dom', 'recompose', 'react-router', 'react-router-dom', 'history'],
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
			statsFilename: path.join('..', 'bundle-size', `stats-${new Date().toISOString()}.json`),
			statsOptions: null,
			logLevel: 'info',
		}),
		new OfflinePlugin({
			externals: [
				'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
				'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=latin',
				'https://highlightjs.org/static/demo/styles/solarized-dark.css',
			],
		}),
	],

	devtool: 'source-map',
});
export default prodConfig;
