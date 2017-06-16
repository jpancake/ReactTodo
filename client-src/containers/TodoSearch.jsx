import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/todo_actions'

class TodoSearch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			term: '',
		}
		this._onInputChange = this._onInputChange.bind(this)
	}

	_onInputChange(event) {
		this.setState({ term: event.target.value }, () => {
			this.props.setSearchText(this.state.term.toLowerCase())
		})
	}
	render() {
		const { showCompleted } = this.props
		return (
			<section className="container__header">
				<div>
					<input
						type="search"
						placeholder="Search Todos"
					  value={this.state.term}
					  onChange={this._onInputChange}
					/>
				</div>
				<div>
					<input
						type="checkbox"
						checked={showCompleted}
						onChange={() => this.props.toggleShowCompleted()}
					/>
					Show completed todo
				</div>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		showCompleted: state.showCompleted,
		searchText: state.searchText,
	}
}

export default connect(mapStateToProps, actions)(TodoSearch)
