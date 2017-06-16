import axios from 'axios'
import moment from 'moment'
import {
	SET_SEARCH_TEXT,
	ADD_TODO,
	LOGIN,
	LOGOUT,
	TOGGLE_SHOW_COMPLETED,
	UPDATE_TODO,
	ADD_TODOS,
	REMOVE_TODO,
} from './types'

const ROOT_URL = 'http://localhost:8000/api'

export function setSearchText(searchText) {
	return {
		type: SET_SEARCH_TEXT,
		payload: searchText,
	}
}

export function toggleShowCompleted() {
	return {
		type: TOGGLE_SHOW_COMPLETED,
	}
}

export function addTodo(todo) {
	return {
		type: ADD_TODO,
		payload: todo,
	}
}

export function addTodos(todos) {
	return {
		type: ADD_TODOS,
		payload: todos,
	}
}

export function updateTodo(id, updates) {
	return {
		type: UPDATE_TODO,
		payload: {
			id,
			updates,
		},
	}
}

export function removeTodo(id) {
	return {
		type: REMOVE_TODO,
		payload: id,
	}
}

export function startAddTodo(text) {
	return async (dispatch) => {
		const res = await axios.post(`${ROOT_URL}/todos`, { text }, { headers: { 'x-auth': localStorage.getItem('token') } })
		const todo = res.data
		dispatch(addTodo(todo))
	}
}

export function startAddTodos() {
	return async (dispatch) => {
		const res = await axios.get(`${ROOT_URL}/todos`, {
			headers: {
				'x-auth': localStorage.getItem('token'),
			},
		})
		const { todos } = res.data
		dispatch(addTodos(todos))
	}
}

export function startToggleTodo(id, completed) {
	const updates = {
		completed,
		completedAt: completed ? moment().unix() : null,
	}
	return async (dispatch) => {
		await axios.patch(`${ROOT_URL}/todos/${id}`, updates, {
			headers: {
				'x-auth': localStorage.getItem('token'),
			},
		})
		dispatch(updateTodo(id, updates))
	}
}

export function startRemoveTodo(id) {
	return async (dispatch) => {
		await axios.delete(`${ROOT_URL}/todos/${id}`, { headers: {
			'x-auth': localStorage.getItem('token'),
		} })
		dispatch({ type: REMOVE_TODO, payload: id })
	}
}
