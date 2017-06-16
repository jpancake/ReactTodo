// Modules
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
// Redux Configuration
import configure from 'Store'
import { AUTH_USER } from 'Actions/types'
import { startAddTodos } from 'Actions/todo_actions'
const store = configure()
// React Components
import App from './components/App'
// Styles
import 'Styles'

// ReactDOM render helper to render the provider (redux store) and react router component. Using JSX react appends the content onto the #app DOM element.
const token = localStorage.getItem('token')

try {
	const decoded = jwtDecode(token)
	if (decoded)
		store.dispatch({ type: AUTH_USER })
	store.dispatch(startAddTodos())
} catch (e) {
	//
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	$('#root')[0])

if (module.hot)
	module.hot.accept()


// This is the most upper level file. Entry point I should say..