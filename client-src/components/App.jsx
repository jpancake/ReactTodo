import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import TodoApp from 'Components/TodoApp'
import Header from 'Containers/Header'
import Features from 'Components/Features'
import Signin from 'Containers/auth/signin'
import Logout from 'Containers/auth/logout'
import Signup from 'Containers/auth/signup'
import RequireAuth from 'Containers/auth/requireAuth'

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