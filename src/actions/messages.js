import * as types from '../constants/messages';
import callApi from '../utils/call-api';
import {fetchChat} from "./chats";

export function sendMessage(content){
  return (dispatch, getState) => {

    const {token} = getState().auth;
    const {activeId} = getState().chats;

    dispatch({
      type: types.SEND_MESSAGE_REQUEST,
      payload: { content }
    });

    return callApi(
        `/chats/${activeId}`,
        token,
        {method: 'POST'},
        {
          data: {
            content
          }
        }
      )
      .then(data => {
        dispatch({
          type: types.SEND_MESSAGE_SUCCESS,
          payload: data,
        });

        dispatch(fetchChat(activeId));
      })
      .catch(reason => dispatch({
        type: types.SEND_MESSAGE_FAILURE,
        payload: reason
      }))
  }
}
