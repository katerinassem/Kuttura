import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from './../spinner/Spinner';
import { getUsers } from './service/usersService';
import style from './style';

const useStyles = makeStyles(style);

function Dashboard() {
  const classes = useStyles();
	const history = useHistory();
	const [ isLoaded, setIsLoaded ] = useState(false);
  const [ users, setUsers ] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        if(usersData) {
          setUsers(usersData.data);
          setIsLoaded(true);
        }
      } catch(error) {
        history.push('/error');
      }
		}

		fetchUsers();
  }, [history]);

	return (
		<Box>
			<Container maxWidth="sm">
				<Typography variant="h2">Users</Typography>
			</Container>
			{
				isLoaded
				? (
          <TableContainer component={Container} maxWidth="lg">
            <Table className={classes.table} size="medium" aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Surname</TableCell>
                  <TableCell align="right">Nationality</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.Id}>
                    <TableCell component="th" scope="row">{user.Id}</TableCell>
                    <TableCell align="right">{user.Firstname}</TableCell>
                    <TableCell align="right">{user.Surname}</TableCell>
                    <TableCell align="right">{user.Nationality}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
				)
				: (<Spinner/>)
			}
		</Box>
	);
}

export default Dashboard;
