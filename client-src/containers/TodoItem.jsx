import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import * as actions from '../actions/todo_actions'

class TodoItem extends Component {
	render() {
		const { _id, text, completed, createdAt, completedAt } = this.props
		const todoClassName = completed ? 'todo todo-completed' : 'todo'
		const renderDate = () => {
			let message = 'Created'
			let timestamp = createdAt
			if (completed) {
				message = 'Completed'
				timestamp = completedAt
			}
			return `${message} ${moment.unix(timestamp).format('MMM Do YYYY @ h:mm a')}`
		}
		return (
			<section className={todoClassName}>
				<section className="flex-container" onClick={() => this.props.startToggleTodo(_id, !completed)}>
					<div>
						<input
							type="checkbox"
							checked={completed}
						/>
					</div>
					<div>
						<p>{text}</p>
						<p className="todo__subtext">{renderDate()}</p>
					</div>
				</section>
				<div className="flex-container align-right">
					<span
	            onClick={() => this.props.startRemoveTodo(_id)}
	            className="close rounded"
					/>
				</div>
			</section>
		)
	}
}

TodoItem.propTypes = {
	_id: PropTypes.string.isRequired,
	text: PropTypes.string,
	completed: PropTypes.bool,
	createdAt: PropTypes.number.isRequired,
	completedAt: PropTypes.number,
	startToggleTodo: PropTypes.func.isRequired,
	startRemoveTodo: PropTypes.func.isRequired,
}

TodoItem.defaultProps = {
	text: '',
	completed: false,
	completedAt: null,
}

export default connect(null, actions)(TodoItem)
