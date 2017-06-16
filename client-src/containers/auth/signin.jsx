import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from 'Actions/user_actions'

@reduxForm({ form: 'SigninForm' })
@connect((state) => { return { errorMessage: state.auth.error } }, actions)
export default class Signin extends Component {
	constructor(props) {
		super(props)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}
	async handleFormSubmit({ email, password }) {
		// Need to do something to log user in
		await this.props.signinUser({ email, password })
		this.props.history.push('/')
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
					label="Password"
					name="password"
					type="password"
					component={this.renderField}
				/>

				{this.renderAlert()}
				<button action="submit" className="primary button expanded">Sign in</button>
			</form>
		)
	}
}


