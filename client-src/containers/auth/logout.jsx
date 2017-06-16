import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions/user_actions'

class Logout extends Component {
	componentWillMount() {
		this.props.signoutUser()
		this.props.logout()
	}
	render() {
		return <div>Sorry to see you go...</div>
	}
}


export default connect(null, actions)(Logout)
