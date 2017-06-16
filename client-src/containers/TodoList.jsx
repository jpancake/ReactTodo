import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TodoItem from './TodoItem'
import filterTodos from '../api/TodoAPI'

@connect(state => state)
export default class TodoList extends Component {
	// TodoList renders depending on the filterTodos function.
	render() {
		const { todos, showCompleted, searchText } = this.props

		const renderTodos = () => {
			const filteredTodos = filterTodos(todos, showCompleted, searchText)
			if (filteredTodos.length === 0) {
				return <p className="container__message">Nothing To Do</p>
			}
			return filteredTodos.map(todo => <TodoItem key={todo._id} {...todo} />)
		}
		return (
			<section>
				{renderTodos()}
			</section>
		)
	}
}

