import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import style from './style';

const useStyles = makeStyles(style);

function ErrorBox({errors}) {
  const classes = useStyles();

  return (
    <Box className={classes.errorbox}>
      {
        errors.map(error => (
          <p key={error.toString()}>{error}</p>
        ))
      }
    </Box>
  );
}

export default ErrorBox;
