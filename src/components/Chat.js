import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MessageList from './MessageList';
import NewMessageBlock from './NewMessageBlock';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop:'66px'
  },

  infoBlock: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const Chat = ({classes, messageList, sendMessage, joinChat, activeChat, currentUser}) => (
  <main className={classes.content}>
    {activeChat ?
      <React.Fragment>
        <MessageList messageList={messageList} activeChat={activeChat} currentUser={currentUser}/>
        <NewMessageBlock sendMessage = {sendMessage} isChatMember={currentUser.isChatMember} joinChat={joinChat} activeChat={activeChat}/>
      </React.Fragment>
    :
      <div className={classes.infoBlock}>
        <Paper className={classes.paper}>
          <Typography variant="display1" gutterBottom>
            Start messaging…
          </Typography>
        </Paper>
      </div>
    }
  </main>
);

export default withStyles(styles)(Chat);
