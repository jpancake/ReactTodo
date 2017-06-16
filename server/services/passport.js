const passport = require('passport')
const { User } = require('./../models/user')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')
const ExtractJwt = require('passport-jwt').ExtractJwt
require('../config/config')

// Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// Verify this email and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
	User.findOne({ email }, (err, user) => {
		if (err) return done(err)
		if (!user) return done(null, false)
		user.comparePassword(password, (err, isMatch) => {
			if (err) return done(err)
			if (!isMatch) return done(null, false)
			return done(null, user)
		})
	})
})

// Setup options for JWT Strategy

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
	secretOrKey: process.env.JWT_SECRET,
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that user
	// otherwise, call done without a user object
	User.findById(payload._id, (err, user) => {
		if (err) return done(err, false) // false meaning not auth
		if (!user) return done(null, false)
		done(null, user)
	})
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)
