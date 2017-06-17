const passport = require('passport')
require('./services/passport')
const user = require('./controllers/user')
const todo = require('./controllers/todo')
const bodyParser = require('body-parser')



const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = (app) => {

	// GET '/'
	app.get('/api', requireAuth, (req, res) => {
		res.send(['Hi', 'Im', 'Just', 'Testing'])
	})

	/* USER */

	// POST '/users/register'
	app.post('/api/users/register', user.register)
	// POST '/users/login'
	app.post('/api/users/login', requireLogin, user.login)
	// GET '/users/me'
	app.get('/api/users/:id', requireAuth, user.profile)
	app.patch('/api/users/me', requireAuth, user.changePassword)
	app.get('/api/users/logout', requireAuth, user.logout)

	/* TODO */

	// POST '/todos'
	app.post('/api/todos', requireAuth, todo.addTodo)
	// GET '/todos'
	app.get('/api/todos', requireAuth, todo.getTodos)
	// GET '/todos/:id'
	app.get('/api/todos/:id', requireAuth, todo.getTodo)
	// DELETE '/todos/:id
	app.delete('/api/todos/:id', requireAuth, todo.removeTodo)
	// PATCH '/todos/:id
	app.patch('/api/todos/:id', requireAuth, todo.updateTodo)
}
