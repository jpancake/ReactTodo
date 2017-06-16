import React, { Component } from 'react'
import TodoSearch from 'Containers/TodoSearch'
import TodoList from 'Containers/TodoList'
import AddTodo from 'Containers/AddTodo'

export default class TodoApp extends Component {
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

