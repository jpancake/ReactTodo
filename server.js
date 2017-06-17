const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const router = require('./server/router')

// MongoDB Setup
require('./server/db/mongoose')

// Server Setup
require('./server/config/config')

const app = express()
const PORT = process.env.PORT || 3050


app.use(express.static('public'))
app.use(bodyParser.json())


app.set('views', path.join(__dirname, 'public/'))
app.set('view engine', 'pug', { pretty: true })

router(app)

app.get('*', (req, res) => {
	res.render('index')
})





app.listen(PORT, () => {
	console.log(`Express Server listening on port ${PORT}`)
})