import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AppRouter from './route/AppRouter';
import AppHeader from './header/AppHeader';
import AuthContext from './AuthContext';

function App() {
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <Box>
        <AppHeader/>
        <AppRouter/>
      </Box>
    </AuthContext.Provider>
  );
}

export default App;
