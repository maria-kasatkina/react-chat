import * as types from '../constants/users';
import callApi from '../utils/call-api';

export function editUserProfile(username, firstName, lastName){
  return (dispatch, getState) => {

    const {token} = getState().auth;

    dispatch({
      type: types.EDIT_USER_PROFILE_REQUEST
    });

    return callApi(
      '/users/me',
      token,
      {method: 'POST'},
      {
        data: {
          username,
          firstName,
          lastName
        },
      },
    )
      .then(json =>
        dispatch({
          type: types.EDIT_USER_PROFILE_SUCCESS,
          payload: json,
        }))
      .catch(reason =>
        dispatch({
          type: types.EDIT_USER_PROFILE_FAILURE,
          payload: reason,
        }));
  }
}
