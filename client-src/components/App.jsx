import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import TodoApp from './TodoApp'
import Header from './../containers/Header'
import Features from './Features'
import Signin from './../containers/auth/signin'
import Logout from './../containers/auth/logout'
import Signup from './../containers/auth/signup'
import RequireAuth from './../containers/auth/requireAuth'

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Route path="/" component={Header} />
				<div className="row align-center">
					<div className="medium-6 large-8 columns">
						<Route path="/features" component={Features} />
						<Route path="/signin" component={Signin} />
						<Route path="/signup" component={Signup} />
						<Route path="/logout" component={Logout} />
						<Route exact path="/" component={RequireAuth(TodoApp)} />
					</div>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default Root