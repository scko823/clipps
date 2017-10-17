const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
})


module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './index.jsx'
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js"
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
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/',
                include: [path.join(__dirname, 'src')]
            },
            // Chained SASS Loader
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            // Chained CSS Loader
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            // Images
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)/,
                use: {
                    loader: ' ',
                    options: {
                        limit: 8192
                    }
                }
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].styles.css',
            allChunks: false
        })
    ],

    devtool: 'eval'
};