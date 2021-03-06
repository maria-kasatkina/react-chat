import * as types from '../constants/auth';
import callApi from '../utils/call-api';

export function signup(username, password){
  return (dispatch) => {
    dispatch({
      type: types.SIGNUP_REQUEST
    });

    return callApi('/signup', undefined, {method: 'POST'},{
      username,
      password
    })
      .then(json => {
        if (!json.token){
          throw new Error('Token is not provided');
        }
        localStorage.setItem('token', json.token);
        return json;
      })
      .then(json => dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: json
      }))
      .catch(reason => dispatch({
        type: types.SIGNUP_FAILURE,
        payload: reason
      }));
  }
}

export function login(username, password){
  return (dispatch) => {
    dispatch({
      type: types.LOGIN_REQUEST
    });

    return callApi('/login', undefined, {method: 'POST'},{
      username,
      password
    })
      .then(json => {
        if (!json.token){
          throw new Error('Token is not provided');
        }
        localStorage.setItem('token', json.token);
        return json;
      })
      .then(json => dispatch({
        type: types.LOGIN_SUCCESS,
        payload: json
      }))
      .catch(reason => dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason
      }));
  }
}

export function logout(){
  return (dispatch, getState) => {
    dispatch({
      type: types.LOGOUT_REQUEST
    });

    const {token} = getState().auth;

    return callApi('/logout', token)
      .then(json => {
        localStorage.removeItem('token');

        dispatch({
          type: types.LOGOUT_SUCCESS,
          payload: json,
        });

      })
      .catch(reason => dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason
      }));
  }
}

export function receiveAuth(){
  return (dispatch, getState) => {
    const {token} = getState().auth;

    if(!token){
      dispatch({
        type: types.RECEIVE_AUTH_FAILURE
      })
    }

    return callApi('/users/me', token)
      .then(json => dispatch({
        type: types.RECEIVE_AUTH_SUCCESS,
        payload: json
      }))
      .catch(reason => dispatch({
        type: types.RECEIVE_AUTH_FAILURE,
        payload: reason
      }));
  }
}
