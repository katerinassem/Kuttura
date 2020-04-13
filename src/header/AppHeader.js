import React, { useContext, useCallback } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from './../auth/authenticationService';
import AuthContext from './../AuthContext';
import { logoutAsyncAction } from '../storeRoutine/actions';
import style from './style';

const useStyles = makeStyles(style);

function AppHeader() {
	const classes = useStyles();
	const history = useHistory();
  const dispatch = useDispatch()
	
	const isAuthenticated = useContext(AuthContext);

	const logoutButtonClickHandler = useCallback(async event => {
		event.preventDefault();

		try {
			await logout();
			dispatch(logoutAsyncAction(history));
		} catch(error) {				
			history.push('/error');
		}
	}, [history, dispatch]);

	return (
			<header className={classes.root}>
				<AppBar position="static"> 
					<Toolbar>
						<IconButton className={classes.appBarItem} edge="start" color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>Kuttura app</Typography>
						{
							isAuthenticated && (
								<Box>                           
									<RouterLink to='/' color="inherit" className={classes.appBarItem}>Dashboard</RouterLink>           
									<RouterLink to='/users' color="inherit" className={classes.appBarItem}>Users</RouterLink>           
									<Button onClick={logoutButtonClickHandler} color="inherit" className={classes.appBarItem}>Logout</Button>
								</Box>
							)
						}   
					</Toolbar>
				</AppBar>
		</header>
	);
}

export default AppHeader;
