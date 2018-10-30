import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllChats, fetchMyChats, setActiveChat, addNewChat, joinChat, leaveChat, deleteChat } from '../actions/chats';
import { logout } from '../actions/auth';
import { sendMessage } from '../actions/messages';
import { editUserProfile } from '../actions/users';
import * as fromChats from '../reducers/chats';
import ChatPage from '../components/ChatPage';
import {isMember, isCreator, isChatMember} from "../reducers";

const mapStateToProps = state => ({

  chats: {
    all: fromChats.getByIds(state.chats, state.chats.allIds),
    my: fromChats.getByIds(state.chats, state.chats.myIds),
    activeChat: fromChats.getById(state.chats, state.chats.activeId)
  },
  currentUser:{
    ...state.auth.user,
    isMember: isMember(state, fromChats.getById(state.chats, state.chats.activeId)),
    isCreator: isCreator(state, fromChats.getById(state.chats, state.chats.activeId)),
    isChatMember: isChatMember(state, fromChats.getById(state.chats, state.chats.activeId))
  },
  messages: state.messages
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAllChats,
    fetchMyChats,
    setActiveChat,
    addNewChat,
    joinChat,
    leaveChat,
    deleteChat,
    sendMessage,
    logout,
    editUserProfile
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
