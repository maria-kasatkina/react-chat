import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MessageList from './MessageList';
import NewMessageBlock from './NewMessageBlock';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop:'66px'
  }
});

const Chat = ({classes, messageList}) => (
  <main className={classes.content}>
    <MessageList messageList={messageList}/>
    <NewMessageBlock />
  </main>
);

export default withStyles(styles)(Chat);
