import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if (!this.props.authenticated)
				this.props.history.push('/signup')
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated)
				this.props.history.push('/signup')
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated }
	}

	return connect(mapStateToProps)(Authentication)
}