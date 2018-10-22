import React from 'react';
import Sidebar from './Sidebar'
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  }
});

class ChatPage extends React.Component {

  componentDidMount(){
    const { fetchAllChats, fetchMyChats, match, setActiveChat} = this.props;

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ])
      .then(() => {
        const { chatId } = match.params;
        if (chatId) {
          setActiveChat(chatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const { match : {params}, setActiveChat } = this.props;
    const { params: newParams } = nextProps.match;

    if (newParams && newParams.chatId && params.chatId !== newParams.chatId){
      setActiveChat(newParams.chatId);
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
      logout
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader
            activeChat={chats.activeChat}
            currentUser={currentUser}
            editUserProfile={editUserProfile}
            leaveChat={leaveChat}
            deleteChat={deleteChat}
            logout={logout} />
          <Sidebar chats={chats} addNewChat={addNewChat}/>
          <Chat
            messageList={messages}
            currentUser={currentUser}
            sendMessage={sendMessage}
            joinChat ={joinChat}
            activeChat = {chats.activeChat}
          />
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(ChatPage);
