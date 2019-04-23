import merge from 'webpack-merge';
import webpack from 'webpack';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import OfflinePlugin from 'offline-plugin';

import ManifestPlugin from 'webpack-manifest-plugin';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import common from './webpack.config.common.babel';

const prodConfig = merge(common, {
	entry: {
		highlight: ['react-highlight'],
		react: ['react', 'react-dom', 'recompose', 'react-router', 'react-router-dom', 'history']
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['highlight', 'react']
		}),
		new UglifyJsPlugin({
			cache: true
		}),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: path.join(
				'..',
				'bundle-size',
				`report-${new Date().toISOString()}.html`
			),
			openAnalyzer: true,
			generateStatsFile: true,
			statsFilename: path.join('..', 'bundle-size', `stats-${new Date().toISOString()}.json`),
			statsOptions: null,
			logLevel: 'info'
		}),
		new ManifestPlugin({
			seed: {
				name: 'Clipps',
				short_name: 'Clipps',
                description: 'A site to share code snippets',
                icons: [{
                        "src": "\/faicons/android-icon-36x36.png",
                        "sizes": "36x36",
                        "type": "image\/png",
                        "density": "0.75"
                    },
                    {
                        "src": "\/favicons\/android-icon-48x48.png",
                        "sizes": "48x48",
                        "type": "image\/png",
                        "density": "1.0"
                    },
                    {
                        "src": "\/favicons\/android-icon-72x72.png",
                        "sizes": "72x72",
                        "type": "image\/png",
                        "density": "1.5"
                    },
                    {
                        "src": "\/favicons\/android-icon-96x96.png",
                        "sizes": "96x96",
                        "type": "image\/png",
                        "density": "2.0"
                    },
                    {
                        "src": "\/favicons\/android-icon-144x144.png",
                        "sizes": "144x144",
                        "type": "image\/png",
                        "density": "3.0"
                    },
                    {
                        "src": "\/favicons\/android-icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image\/png",
                        "density": "4.0"
                    }
                ]
			}
		}),
		new OfflinePlugin({
			externals: [
				'/',
				'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
				'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=latin'
			],
			excludes: ['**/*.map'],
			ServiceWorker: {
				events: true,
				navigateFallbackURL: '/',
				mode: 'no-cors'
			}
		})
	],

	devtool: 'source-map'
});
export default prodConfig;
