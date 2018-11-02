import React from 'react';
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
