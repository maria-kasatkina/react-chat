import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  addNewChat,
  joinChat,
  leaveChat,
  deleteChat,
} from '../actions/chats';
import { logout } from '../actions/auth';
import { editUserProfile } from '../actions/users';
import {
  sendMessage, mountChat, unmountChat, socketsConnect,
} from '../actions/sockets';
import * as fromChats from '../reducers/chats';
import ChatPage from '../components/ChatPage';
import { isMember, isCreator, isChatMember } from '../reducers';

const mapStateToProps = (state) => {
  const activeChat = fromChats.getById(state.chats, state.chats.activeId);

  return {
    chats: {
      all: fromChats.getByIds(state.chats, state.chats.allIds),
      my: fromChats.getByIds(state.chats, state.chats.myIds),
      activeChat,
    },
    currentUser: {
      ...state.auth.user,
      isMember: isMember(state, activeChat),
      isCreator: isCreator(state, activeChat),
      isChatMember: isChatMember(state, activeChat),
    },
    messages: state.messages,
    error: state.services.errors.chat,
    isConnected: state.services.isConnected,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchAllChats,
    fetchMyChats,
    setActiveChat,
    addNewChat,
    joinChat,
    leaveChat,
    deleteChat,
    logout,
    editUserProfile,
    sendMessage,
    mountChat,
    unmountChat,
    socketsConnect,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatPage);
