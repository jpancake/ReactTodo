import React, { Component } from 'react'
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from './../../actions/user_actions'

function mapStateToProps(state) {
	return { errorMessage: state.auth.error }
}

@reduxForm({
	form: 'SignupForm',
	validate
})
@connect(mapStateToProps, actions)
export default class Signup extends Component {
	constructor(props) {
		super(props)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}
	async handleFormSubmit(formProps) {
		// Call action creator to sign up the user
		const user = _.pick(formProps, ['email', 'username', 'password'])
		try {
			await this.props.signupUser(user)
			this.props.history.push('/')
		} catch (e) {

		}
	}
	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			)
		}
	}
	renderField(field) {
		const { input, meta: { touched, error } } = field

		return (
			<div>
				<label htmlFor={field.label}>{field.label}</label>
				<input
					type={field.type}
					{...input}
				/>
				<div>
					{touched && error && <div className="error">{error}</div>}
				</div>
			</div>
		)
	}
	render() {
		const { handleSubmit } = this.props
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>

				<Field
					label="Email"
					name="email"
					type="email"
					component={this.renderField}
				/>

				<Field
					label="Username"
					name="username"
					type="text"
					component={this.renderField}
				/>

				<Field
					label="Password"
					name="password"
					type="password"
					component={this.renderField}
				/>

				<Field
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					component={this.renderField}
				/>

				{this.renderAlert()}

				<button className="button primary expanded" action="submit">Sign Up!</button>
			</form>
		)
	}
}

function validate(formProps) {
	const errors = {}

	if (!formProps.email)
		errors.email = 'Please enter an email'

	if (!formProps.username)
		errors.username = 'Please enter an username'

	if (!formProps.password)
		errors.password = 'Please enter a password'


	if (!formProps.confirmPassword)
		errors.confirmPassword = 'Please enter a password confirmation'

	return errors
}



