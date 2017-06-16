const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require('path')
const chalk = require('chalk')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const config = require('./webpack.devConfig')
const router = require('./server/router')

const PORT = 8000

// Server Setup
require('./server/config/config')

// MongoDB Setup
require('./server/db/mongoose')

const server = new WebpackDevServer(webpack(config), {
	contentBase: '/public',
	port: PORT,
	hot: true,
	historyApiFallback: true,
	compress: false,
	setup: (app) => {
		app.use(morgan('dev'))
		app.use(bodyParser.json())
		router(app)
	},
	quiet: false,
	noInfo: false,
	stats: {
		colors: true,
	},
})

server.listen(PORT, 'localhost', () => {
	console.log(chalk.bgWhite.bold(`Webpack Development Server is up and running on port ${PORT}`))
	console.log(chalk.blue(`Browse to http://localhost:${PORT}`))
})
