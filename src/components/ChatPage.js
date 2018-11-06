import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import ErrorMessage from './ErrorMessage';

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

class ChatPage extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    fetchAllChats: PropTypes.func.isRequired,
    fetchMyChats: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    addNewChat: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    editUserProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
    chats: PropTypes.shape({
      activeChat: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
      my: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        }),
      ).isRequired,
      all: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        statusMessage: PropTypes.bool,
        sender: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          lastName: PropTypes.string,
          firstName: PropTypes.string,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ).isRequired,
    currentUser: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    error: null,
  };

  componentDidMount() {
    const {
      fetchAllChats,
      fetchMyChats,
      match,
      setActiveChat,
      socketsConnect,
      mountChat,
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketsConnect();
      })
      .then(() => {
        const { chatId } = match.params;
        if (chatId) {
          setActiveChat(chatId);
          mountChat(chatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      setActiveChat,
      mountChat,
      unmountChat,
    } = this.props;
    const { params: newParams } = nextProps.match;

    if (newParams && newParams.chatId && params.chatId !== newParams.chatId) {
      setActiveChat(newParams.chatId);
      unmountChat(params.chatId);
      mountChat(newParams.chatId);
    }
  }

  render() {
    const {
      classes,
      chats,
      messages,
      currentUser,
      addNewChat,
      joinChat,
      leaveChat,
      deleteChat,
      sendMessage,
      editUserProfile,
      logout,
      error,
      isConnected,
    } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <ChatHeader
              isConnected={isConnected}
              activeChat={chats.activeChat}
              currentUser={currentUser}
              editUserProfile={editUserProfile}
              leaveChat={leaveChat}
              deleteChat={deleteChat}
              logout={logout}
            />
            <Sidebar isConnected={isConnected} chats={chats} addNewChat={addNewChat} />
            <Chat
              isConnected={isConnected}
              messageList={messages}
              currentUser={currentUser}
              sendMessage={sendMessage}
              joinChat={joinChat}
              activeChat={chats.activeChat}
            />
          </div>
        </div>
        <ErrorMessage error={error} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatPage);
