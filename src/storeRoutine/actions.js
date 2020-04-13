import { LOGON, LOGOUT } from './actionTypes';

const logonAction = () => ({ type: LOGON });
export const logonAsyncAction = history => {
  return dispatch => {
    dispatch(logonAction());
    history.push('/');
  };
};

const logoutAction = () => ({ type: LOGOUT });
export const logoutAsyncAction = history => {
  return dispatch => {
    dispatch(logoutAction());
    history.push('/logon');
  };
};
