/* globals window */
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import Thunk from 'redux-thunk'
import { reducer as form } from 'redux-form'

import authReducer from '../reducers/auth_reducer'
import searchTextReducer from '../reducers/searchText_reducer'
import todosReducer from '../reducers/todos_reducer'
import showCompletedReducer from '../reducers/showCompleted_reducer'

const configure = (initialState = {}) => {
	const reducer = combineReducers({
		form,
		auth: authReducer,
		searchText: searchTextReducer,
		todos: todosReducer,
		showCompleted: showCompletedReducer,
	})

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	const store = createStore(reducer, initialState, composeEnhancers(
		applyMiddleware(Thunk),
	))

	return store
}

export default configure
