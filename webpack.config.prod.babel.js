import merge from 'webpack-merge'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import common from './webpack.config.common.babel'

const prodConfig = merge(common, {
	plugins: [
		new MinifyPlugin({
			removeConsole: true,
			removeDebugger: true,
		}),
	],

	devtool: 'source-map',
})
export default prodConfig

// entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.jsx')],
// output: {
// 	filename: '[name].[hash].bundle.js',
// 	path: path.resolve(__dirname, 'dist'),
// },
// resolve: {
// 	extensions: ['.js', '.json', '.jsx'],
// },
