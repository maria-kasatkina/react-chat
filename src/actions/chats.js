/* eslint no-underscore-dangle: 0 */
import * as types from '../constants/chats';
import callApi from '../utils/call-api';
import { redirect } from './services';

export function fetchMyChats() {
  return (dispatch, getState) => {
    const state = getState();

    const { isFetching } = state.services;

    if (isFetching.myChats) {
      return Promise.resolve();
    }

    const { token } = state.auth;
    dispatch({
      type: types.FETCH_MY_CHATS_REQUEST,
    });

    return callApi('/chats/my', token)
      .then(data => dispatch({
        type: types.FETCH_MY_CHATS_SUCCESS,
        payload: data,
      }))
      .catch(reason => dispatch({
        type: types.FETCH_MY_CHATS_FAILURE,
        payload: reason,
      }));
  };
}

export function fetchAllChats() {
  return (dispatch, getState) => {
    const state = getState();
    const { isFetching } = state.services;

    if (isFetching.allChats) {
      return Promise.resolve();
    }

    const { token } = state.auth;

    dispatch({
      type: types.FETCH_ALL_CHATS_REQUEST,
    });

    return callApi('/chats', token)
      .then(data => dispatch({
        type: types.FETCH_ALL_CHATS_SUCCESS,
        payload: data,
      }))
      .catch(reason => dispatch({
        type: types.FETCH_ALL_CHATS_FAILURE,
        payload: reason,
      }));
  };
}

export function fetchChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();

    const { isFetching } = state.services;

    if (isFetching.chat) {
      return Promise.resolve();
    }

    const { token } = state.auth;
    dispatch({
      type: types.FETCH_CHAT_REQUEST,
    });

    return callApi(`/chats/${chatId}`, token)
      .then(data => dispatch({
        type: types.FETCH_CHAT_SUCCESS,
        payload: data,
      }))
      .catch(reason => dispatch({
        type: types.FETCH_CHAT_FAILURE,
        payload: reason,
      }));
  };
}

export function setActiveChat(chatId) {
  return dispatch => dispatch(fetchChat(chatId)).then((data) => {
    const success = data && data.payload && data.payload.success;
    if (!success) {
      dispatch(redirect('chat'));
      return dispatch({
        type: types.UNSET_ACTIVE_CHAT,
      });
    }

    dispatch({
      type: types.SET_ACTIVE_CHAT,
      payload: data.payload,
    });

    return dispatch(redirect(`chat/${data.payload.chat._id}`));
  });
}

export function addNewChat(title) {
  return (dispatch, getState) => {
    const state = getState();
    const { isFetching } = state.services;

    if (isFetching.createChat) {
      return Promise.resolve();
    }

    const { token } = state.auth;

    dispatch({
      type: types.ADD_NEW_CHAT_REQUEST,
    });

    return callApi(
      '/chats',
      token,
      { method: 'POST' },
      {
        data: {
          title,
        },
      },
    )
      .then((json) => {
        dispatch({
          type: types.ADD_NEW_CHAT_SUCCESS,
          payload: json,
        });
        dispatch(redirect(`chat/${json.chat._id}`));
        return json;
      })
      .catch(reason => dispatch({
        type: types.ADD_NEW_CHAT_FAILURE,
        payload: reason,
      }));
  };
}

export function joinChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isFetching } = state.services;

    if (isFetching.joinChat) {
      return Promise.resolve();
    }

    const { token } = state.auth;

    dispatch({
      type: types.JOIN_CHAT_REQUEST,
      payload: chatId,
    });

    return callApi(`/chats/${chatId}/join`, token)
      .then(({ chat }) => {
        dispatch({
          type: types.JOIN_CHAT_SUCCESS,
          payload: { chat },
        });

        return dispatch(fetchChat(chatId));
      })
      .catch(reason => dispatch({
        type: types.JOIN_CHAT_FAILURE,
        payload: reason,
      }));
  };
}

export function leaveChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isFetching } = state.services;

    if (isFetching.leaveChat) {
      return Promise.resolve();
    }

    const { token } = state.auth;

    dispatch({
      type: types.LEAVE_CHAT_REQUEST,
      payload: chatId,
    });

    return callApi(`/chats/${chatId}/leave`, token)
      .then((json) => {
        dispatch({
          type: types.LEAVE_CHAT_SUCCESS,
          payload: json,
        });

        dispatch(redirect('chat'));
        return json;
      })
      .catch(reason => dispatch({
        type: types.LEAVE_CHAT_FAILURE,
        payload: reason,
      }));
  };
}

export function deleteChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { isFetching } = state.services;

    if (isFetching.deleteChat) {
      return Promise.resolve();
    }

    const { token } = state.auth;

    dispatch({
      type: types.DELETE_CHAT_REQUEST,
      payload: chatId,
    });

    return callApi(`/chats/${chatId}`, token, { method: 'DELETE' })
      .then(({ chat }) => {
        dispatch({
          type: types.DELETE_CHAT_SUCCESS,
          payload: { chat },
        });

        dispatch(redirect('chat'));
        return chat;
      })
      .catch(reason => dispatch({
        type: types.DELETE_CHAT_FAILURE,
        payload: reason,
      }));
  };
}
