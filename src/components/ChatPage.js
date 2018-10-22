import React from 'react';
import Sidebar from './Sidebar'
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import { withStyles } from '@material-ui/core/styles';
import {chatList, messageList} from '../mock-data';

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
    const { fetchAllChats, fetchMyChats } = this.props;

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ]);
  }

  render() {
    const {classes, chats} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <ChatHeader/>
          <Sidebar chatList={chats}/>
          <Chat messageList={messageList}/>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(ChatPage);
