import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Container, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logon } from './../auth/authenticationService';
import { logonAsyncAction } from '../storeRoutine/actions';
import style from './style';
import ErrorBox from './../error/ErrorBox';

const useStyles = makeStyles(style);

const validate = (company, account, password, setErrors) => {
  const newErrors = [];

  if(!company) {
      newErrors.push('please check company field');
  }
  if(!account) {
      newErrors.push('please check account field');
  }
  if(!password) {
      newErrors.push('please check password field');
  }

  setErrors(newErrors);
  return newErrors.length === 0;
};

function Logon() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()

  const [company, setCompany] = useState('');
  const [account, setAcount] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const formSubmitHandler = useCallback(async event => {
    if(event) {
      event.preventDefault();
    }

    if(!validate(company, account, password, setErrors)) {
      return false;
    }

    try {
      await logon(company, account, password);
      dispatch(logonAsyncAction(history));
    } catch(error) {
      if(error.response) {
        setErrors([error.response.data.ErrorMessage]);
      } else {
        history.push('/error');
      }
    };
  }, [company, account, password, history, dispatch]);

  return (
    <Container maxWidth="sm"> 
      <Typography variant="h2">Logon here</Typography>
      <form onSubmit={formSubmitHandler} className={classes.root} noValidate autoComplete="off">
        <Input value={company} onChange={e => setCompany(e.target.value)} 
          required fullWidth placeholder="company" inputProps={{ 'aria-label': 'description' }} />
        
        <Input value={account} onChange={e => setAcount(e.target.value)} 
          required fullWidth placeholder="account" inputProps={{ 'aria-label': 'description' }} />
        
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} 
          required fullWidth placeholder="password" inputProps={{ 'aria-label': 'description' }} />
        
        <Button type="submit" variant="outlined" color="primary">Logon</Button>
      </form>
      <ErrorBox errors={errors}/>
    </Container>
  );
}

export default Logon;
