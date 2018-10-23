import {combineReducers} from 'redux';
import * as types from '../constants';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: [],
  byIds: {}
};

const activeId = (state = initialState.activeId, action) => {
  switch (action.type){
    case types.SET_ACTIVE_CHAT:
    case types.JOIN_CHAT_SUCCESS:
      return getChatId(action.payload.chat);
    case types.UNSET_ACTIVE_CHAT:
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return '';
    default:
      return state;
  }
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type){
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.DELETE_CHAT_SUCCESS:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
};

const myIds = (state = initialState.myIds, action) => {
  switch (action.type){
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.ADD_NEW_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
      return [...state, getChatId(action.payload.chat)];
    case types.LEAVE_CHAT_SUCCESS:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    case types.DELETE_CHAT_SUCCESS:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
};

const byIds = (state = initialState.byIds, action) => {
  switch (action.type){
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce((ids, chat) => ({
          ...ids,
          [chat._id]: chat
        }), {})
      };
    case types.JOIN_CHAT_SUCCESS:
    case types.ADD_NEW_CHAT_SUCCESS:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };
    default:
      return state;
  }
};

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds
})

export const getChatId = (chat) => chat._id;
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
export const getById = (state, id) => state.byIds[id];
