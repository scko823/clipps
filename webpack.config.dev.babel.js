import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import common from './webpack.config.common.babel';

const devConfig = merge(common, {
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		staticOptions: {
			redirect: true
		},
		compress: true,
		hot: true,
		https: true,
		port: 9000,
		historyApiFallback: {
			index: 'index.html',
			rewrites: [
				{
					from: /\.bundle.js$/,
					to(context) {
						return `${context.parsedUrl.pathname}`;
					}
				},
				{
					from: /./,
					to: '/index.html'
				}
			]
		}
	},
	devtool: 'cheap-module-source-map'
});

export default devConfig;
