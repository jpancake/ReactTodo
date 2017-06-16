const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		bundle: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8000/',
			'webpack/hot/dev-server',
			'babel-polyfill',
			'script-loader!jquery/dist/jquery.min.js',
			'index',
		]
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
		modules: ['node_modules', 'client-src'],
		extensions: ['.js', '.jsx', '.sass'],
		mainFiles: ['index', 'configureStore', 'index_styles', 'reducers'],
		alias: {
			'Components': path.resolve(__dirname, './client-src/components'),
			'Containers': path.resolve(__dirname, 'client-src/containers'),
			'Actions': path.resolve(__dirname, './client-src/actions'),
			'Styles': path.resolve(__dirname, './client-src/styles'),
			'Reducers': path.resolve(__dirname, './client-src/reducers'),
			'Store': path.resolve(__dirname, './client-src/store'),
		}
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: 'pug-loader',
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(sass|scss)$/,
				loaders: ['style-loader', 'css-loader',
					{
						loader: 'sass-loader',
						query: {
							includePaths: [
								path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
							]
						}
					}]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client-src/views/template.pug',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'inline-source-map'
}
