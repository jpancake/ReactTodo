/* globals localStorage */
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		minlength: 1,
		required: true,
		unique: true,
		lowercase: true,
		validate: {
			isAsync: true,
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email',
		},
	},
	username: {
		type: String,
		minlength: 1,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
})

UserSchema.pre('save', function (next) {
	const user = this

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

UserSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	return _.pick(userObject, ['_id', 'username', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	const user = this
	const access = 'auth'
	const tokens = []
	const token = jwt.sign(
		{
			_id: user._id.toHexString(),
			iat: new Date().getTime(),
		},
		process.env.JWT_SECRET).toString()

	try {
		tokens.push({ access, token })
		localStorage.setItem('tokens', JSON.stringify(tokens))
	} catch (e) {
		//
	}

	return token
}

UserSchema.statics.findByCredentials = async function (email, password) {
	const User = this
	const user = await User.findOne({ email })
	if (!user)
		return Promise.reject()
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, user.password, (err, res) => {
			if (res)
				resolve(user)
			reject()
		})
	})
}

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return callback(err)
		callback(null, isMatch)
	})
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
