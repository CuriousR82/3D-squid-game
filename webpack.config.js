const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
	mode: webpackMode,
	entry: {
		main: './src/main.js',
	},
	output: {
		path: path.resolve('./dist'),
		filename: '[name].min.js'
	},
	// es5로 빌드 해야 할 경우 주석 제거
	// 단, 이거 설정하면 webpack-dev-server 3번대 버전에서 live reloading 동작 안함
	// target: ['web', 'es5'],
	devServer: {
		liveReload: true
	},
	optimization: {
		minimizer: webpackMode === 'production' ? [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		] : [],
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/main.css", to: "./main.css" },
				// { from: "./src/images", to: "./images" },
				{ from: "./src/models", to: "./models" },
				{ from: "./src/sounds", to: "./sounds" }
			],
		})
	]
};
