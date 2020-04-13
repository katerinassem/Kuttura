import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Logon from './../logon/Logon';
import Dashboard from './../dashboard/Dashboard';
import Users from './../users/Users';
import AuthorizedRoute from './AuthorizedRoute';

function AppRouter() {
	return (
		<main>
			<Switch>
				<AuthorizedRoute exact path='/'><Dashboard/></AuthorizedRoute>
				<AuthorizedRoute exact path='/users'><Users/></AuthorizedRoute>
				<Route path='/logon' component={Logon}/>
				<Route exact path='/error' render={() => (
					<Container maxWidth="xs">
						<h2>An error occured. Please try again.</h2>
					</Container>
				)}/>
				<Container maxWidth="xs">
					<h1>Page not found</h1>
				</Container>
			</Switch>
		</main>
	)
}

export default AppRouter;
