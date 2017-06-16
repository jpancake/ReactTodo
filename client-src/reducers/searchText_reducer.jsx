import { SET_SEARCH_TEXT } from './../actions/types'

export default function searchTextReducer(state = '', action) {
	switch (action.type) {
	case SET_SEARCH_TEXT:
		return action.payload
	default:
		return state
	}
}
