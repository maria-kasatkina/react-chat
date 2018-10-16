import * as types from '../constants'
import fetch from "isomorphic-fetch";

export function signup(username, password){
  return (dispatch) => {
    dispatch({
      type: types.SIGNUP_REQUEST
    });

    return fetch('http://localhost:8000/v1/signup', {
      method: 'POST',
      headers: {
        'Content-type':'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          return json;
        }
        throw new Error(json.message);
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

    return fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      headers: {
        'Content-type':'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          return json;
        }
        throw new Error(json.message);
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
  return (dispatch) => {
    dispatch({
      type: types.LOGOUT_REQUEST
    })
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

    return fetch('http://localhost:8000/v1/users/me', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type':'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          return json;
        }
        throw new Error(json.message);
      })
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
