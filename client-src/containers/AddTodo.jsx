import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'Actions/todo_actions'

@connect(null, actions)
export default class AddTodo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
		}
		this._handleSubmit = this._handleSubmit.bind(this)
		this._onInputChange = this._onInputChange.bind(this)
	}
	// on input change it changes the value of the text state using component state.
	_onInputChange(event) {
		this.setState({ text: event.target.value })
	}
	// handle submit function when the user submits the form. It passes this.state.text onto the startAddTodo action and resets the state of text to blank
	_handleSubmit(event) {
		event.preventDefault()

		this.props.startAddTodo(this.state.text)
		this.setState({ text: '' })
	}

	render() {
		// we are rendering a form and input onto the screen where user can type an todo item and press the submit to submit.
		return (
			<section className="container__footer">
				<form onSubmit={this._handleSubmit}>
					<input
						type="text"
						value={this.state.text}
						onChange={this._onInputChange}
						required
					/>
					<button className="button expanded">Add a Todo Item</button>
				</form>
			</section>
		)
	}
}

AddTodo.propTypes = {
	startAddTodo: PropTypes.func.isRequired,
}

