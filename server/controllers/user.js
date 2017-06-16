const _ = require('lodash')
const bcrypt = require('bcryptjs')
const { User } = require('../models/user')

module.exports = {
	async register(req, res) {
		const body = _.pick(req.body, ['email', 'username', 'password'])
		const user = new User(body)

		try {
			await user.save()
			const token = await user.generateAuthToken()
			res.header('x-auth', token).send({ token })
		} catch (e) {
			res.status(400).send({ error: e })
		}
	},
	async login(req, res) {
		const { email, password } = req.body

		const user = await User.findByCredentials(email, password)
		const token = await user.generateAuthToken()
		res.header('x-auth', token)
		res.send({ token })
	},
	profile(req, res) {
		res.send(req.user)
	},
	changePassword(req, res, next) {
		const { user, body: { prevPassword } } = req
		let { password } = req.body

		user.comparePassword(prevPassword, async (err, isMatch) => {
			if (err) return res.status(400).send()
			if (!isMatch) return res.status(401).send({ error: 'The password you entered is not correct' })

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) return next(err)
					password = hash
					try {
						const user = await User.findOneAndUpdate(
							{
								username: req.user.username,
							},
							{
								$set: { password },
							})

						if (!user) return res.status(404).send()

						res.send({ user })
					} catch (e) {
						res.status(400).send(e)
					}
				})
			})
		})
	},
	async logout(req, res) {
		await req.logout()
		res.redirect('/')
	},
}

