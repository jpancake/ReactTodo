const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const VENDOR_LIBS = [
	'babel-polyfill',
	'script-loader!jquery/dist/jquery.min.js',
	'react',
	'react-dom',
]

module.exports = {
	entry: {
		bundle: [
			'index',
		],
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].js'
	},
	externals: {
		jquery: 'jQuery'
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'client-src')],
		extensions: ['.js', '.jsx', '.sass'],
		mainFiles: ['index', 'configureStore', 'index_styles', 'reducers'],
		alias: {
			Components: path.resolve(__dirname, './client-src/components'),
			Containers: path.resolve(__dirname, './client-src/containers'),
			Actions: path.resolve(__dirname, './client-src/actions'),
			Styles: path.resolve(__dirname, './client-src/styles'),
			Reducers: path.resolve(__dirname, './client-src/reducers'),
			Store: path.resolve(__dirname, './client-src/store'),
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader',
						{
							loader: 'sass-loader',
							options: {
								includePaths: [path.resolve(__dirname, 'node_modules/foundation-sites/scss')]
							}
						}]
				})
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendor'],
			filename: '[name]'.js,
			minChunks: Infinity
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: false,
			allChunks: true
		}),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: 'client-src/views/template.pug',
			filetype: 'pug',
			filename: 'index.pug'
		}),
		new HtmlWebpackPugPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	devtool: 'inline-source-map'
}
