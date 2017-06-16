import axios from 'axios'
import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_MESSAGE,
	LOGOUT } from './types'

import * as todoActions from './todo_actions'

const ROOT_URL = 'http://localhost:8000/api'

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error,
	}
}

export function signinUser({ email, password }) {
	return async function (dispatch) {
		try {
			const res = await axios.post(`${ROOT_URL}/users/login`, { email, password })
			dispatch({ type: AUTH_USER })

			localStorage.setItem('token', res.data.token)
			await dispatch(todoActions.startAddTodos())

		} catch (e) {
			dispatch(authError('Bad Login Information'))
		}
	}
}

export function signupUser({ email, username, password }) {
	return async function (dispatch) {
		try {
			const res = await axios.post(`${ROOT_URL}/users/register`, { email, username, password })

			dispatch({ type: AUTH_USER })

			localStorage.setItem('token', res.data.token)

		} catch (res) {
			console.log(res.response.data.error.errmsg)
			dispatch(authError(res.response.data.error.errmsg))
		}
	}
}

export function signoutUser() {
	localStorage.removeItem('token')
	return { type: UNAUTH_USER }
}

export function logout() {
	return { type: LOGOUT }
}

export function fetchMessage() {
	return function (dispatch) {
		axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token') },
		})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message,
				})
			})
	}
}


