import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
	}
}

@connect(mapStateToProps)
export default class Header extends Component {
	renderLinks() {
		if (this.props.authenticated)
			return (
				<li className="nav-item">
					<Link to="/logout">Sign Out</Link>
				</li>
			)
    
		return [
			<li className="nav-item" key={1}>
				<Link to="/signin">Sign In</Link>
			</li>,
			<li className="nav-item" key={2}>
				<Link to="/signup">Sign Up</Link>
			</li>,
		]
	}
	render() {
		return (
			<nav className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
						<li className="menu-text">
							Todo Application
						</li>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/features">Features</Link>
						</li>
					</ul>
				</div>
				<div className="top-bar-right">
					<ul className="menu">
						{this.renderLinks()}
					</ul>
				</div>
			</nav>
		)
	}
}

