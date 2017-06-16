import React, { Component } from 'react'
import TodoSearch from '../containers/TodoSearch'
import TodoList from '../containers/TodoList'
import AddTodo from '../containers/AddTodo'

class TodoApp extends Component {
	render() {
		return (
			<section>
				<TodoSearch />
				<TodoList />
				<AddTodo />
			</section>
		)
	}
}

export default TodoApp
