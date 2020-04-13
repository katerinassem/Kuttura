import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import App from './App';
import { store, persistor } from './storeRoutine/store';
import { setupAxiosInterceptors } from './api';

// Dev
const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackExtraHooks: [
    [require('react-redux/lib'), 'useSelector'],
    [require('react-redux/lib'), 'useDispatch']
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const history = createBrowserHistory();
const { dispatch } = store;

setupAxiosInterceptors(dispatch, history);
