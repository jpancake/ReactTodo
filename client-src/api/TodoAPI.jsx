export default function filterTodos(todos, showCompleted, searchText) {
	let filteredTodos = todos

	// filter by showCompleted
	filteredTodos = filteredTodos.filter((todo) => {
		return !todo.completed || showCompleted
	})
	// filter by searchText
	filteredTodos = filteredTodos.filter((todo) => {
		const text = todo.text.toLowerCase()
		return searchText.length === 0 || text.indexOf(searchText) > -1
	})
	// sort todos with non-completed first
	filteredTodos.sort((a, b) => {
		if (!a.completed && b.completed) {
			return -1 // b will come after a
		} else if (a.completed && !b.completed) {
			return 1 // a will come after b
		}
		return 0
	})
	return filteredTodos
}