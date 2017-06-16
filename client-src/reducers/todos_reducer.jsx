import {
	ADD_TODO,
	LOGOUT,
	UPDATE_TODO,
	ADD_TODOS,
	REMOVE_TODO,
} from './../actions/types'

export default function todosReducer(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				action.payload,
			]
		case LOGOUT:
			return []
		case UPDATE_TODO:
			return state.map(todo => {
				if (todo._id === action.payload.id) {
					return {
						...todo,
						...action.payload.updates,
					}
				}
				return todo
			})
		case ADD_TODOS:
			return [
				...state,
				...action.payload,
			]
		case REMOVE_TODO:
			return state.filter(todo => todo._id !== action.payload)
		default:
			return state
	}
}
