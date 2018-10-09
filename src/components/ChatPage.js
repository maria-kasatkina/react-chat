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

const ChatPage = ({classes}) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <ChatHeader/>
      <Sidebar chatList={chatList} />
      <Chat messageList={messageList}/>
    </div>
  </div>
);

export default withStyles(styles)(ChatPage);
