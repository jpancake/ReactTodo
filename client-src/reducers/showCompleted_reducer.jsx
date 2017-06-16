import { TOGGLE_SHOW_COMPLETED } from './../actions/types'

export default function showCompletedReducer(state = false, action) {
	switch (action.type) {
		case TOGGLE_SHOW_COMPLETED:
			return !state
		default:
			return state
	}
}