import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'Actions/user_actions'


@connect(null, actions)
export default class Logout extends Component {
	componentWillMount() {
		this.props.signoutUser()
		this.props.logout()
	}
	render() {
		return <div>Sorry to see you go...</div>
	}
}

