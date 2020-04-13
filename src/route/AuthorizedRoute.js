import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from './../AuthContext';

function AuthorizedRoute({ children, ...rest }) {
  const isAuthenticated = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => isAuthenticated
        ? (children)
        : (
          <Redirect
            to={{
              pathname: "/logon",
              state: { from: location }
            }}
          />
        )
      }/>
  );
}

export default AuthorizedRoute;
