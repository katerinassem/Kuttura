import {
  LOGON,
  LOGOUT
} from './actionTypes'

export default function (state = { isAuthenticated: false }, action) {
  switch (action.type) {
    case LOGON:
      const { history } = action;
      return Object.assign({}, state, {
        isAuthenticated: true,
        history
      })
    case LOGOUT:
      return {
        isAuthenticated: false
      }
    default:
      return state
  }
};
