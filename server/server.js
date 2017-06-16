const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')

// Express Setup
const app = express()

// MongoDB Setup
require('./db/mongoose')

// App Setup
app.use(morgan('dev'))
app.use(bodyParser.json())
router(app)

// Server Setup
require('./config/config')

const PORT = 3090
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

module.exports = app
