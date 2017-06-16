/* eslint no-sequences: 0 */
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const { Todo } = require('./../models/todo')
const moment = require('moment')

module.exports = {
	// Create new to-do item with the body of the request
	// try to save the item in the database and send it back to the user
	// If there is an error we will catch the error and send it back to the user
	// with a status response of 400
	async addTodo(req, res) {
		const todo = new Todo({
			text: req.body.text,
			_creator: req.user._id,
			createdAt: moment().unix()
		})
		try {
			const doc = await todo.save()
			res.send(doc)
		} catch (e) {
			res.status(400).send(e)
		}
	},
	// search TO-DO database using the id the of user who made the request
	// set the response equal to the const todos and send it back to the user
	// if there is any errors we will catch them and send them back to the user
	// with a status response of 400
	async getTodos(req, res) {
		try {
			const todos = await Todo.find({ _creator: req.user._id })
			res.send({ todos })
		} catch (e) {
			res.status(400).send(e)
		}
	},
	async getTodo(req, res) {
		const id = req.params.id

		if (!ObjectID.isValid(id))
			return res.status(404).send()

		try {
			const todo = await Todo.findOne({ _id: id, _creator: req.user._id })

			if (!todo)
				return res.status(404).send({ error: 'Todo item not found' })

			res.send({ todo })
		} catch (e) {
			res.status(400).send(e)
		}
	},
	async removeTodo(req, res) {
		const id = req.params.id

		if (!ObjectID.isValid(id))
			return res.status(404).send()

		try {
			const todo = await Todo.findOneAndRemove({
				_id: id,
				_creator: req.user._id,
			})
			if (!todo)
				return res.status(404).send({ error: 'Todo item not found' })

			res.send({ todo })
		} catch (e) {
			res.status(400).send(e)
		}
	},
	async updateTodo(req, res) {
		const id = req.params.id
		const body = _.pick(req.body, ['text', 'completed'])

		if (!ObjectID.isValid(id))
			return res.status(404).send()

		if (_.isBoolean(body.completed) && body.completed)
			body.completedAt = new Date().getTime()
		else
			body.completed = false,
			body.completedAt = null

		try {
			const todo = await Todo.findOneAndUpdate({
				_id: id,
				_creator: req.user._id,
			}, { $set: body }, { new: true })

			if (!todo)
				return res.status(404).send({ error: 'todo not found' })

			res.send({ todo })
		} catch (e) {
			res.status(400).send(e)
		}
	},
}
