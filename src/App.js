import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Sidebar from  './components/Sidebar'
import ChatHeader from './components/ChatHeader';
import Chat from './components/Chat';

import {chatList, messageList} from './mock-data';


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
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  messagesWrapper: {
    height: 'calc(100% - 80px)',
    overflowY: 'scroll'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  chatList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll'
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  joinChat: {
    width: 'calc(100% - 420px)',
    bottom: 0,
    padding: '24px',
    position: 'fixed',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  joinButton: {
    width: '100%'
  },

  messageWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 24px'
  },

  message: {
    padding: '8px',
    width: 'fit-content',
    maxWidth: '70%',
    minWidth: '10%',
    marginLeft: '16px',
    margin: '0 0 0 13px',
  },

  myMessageWrapper:{
    justifyContent: 'flex-end'
  },

  myMessage: {
    margin: '0 13px 0 0',
    backgroundColor: '#e6dcff'
  },

  white: {
    color: '#fff'
  },

  orange: {
    color: deepOrange[500]
  },

  purple: {
    color: deepPurple[500]
  },

  statusMessage: {
    textAlign: 'center'
  },

  statusMessageUser: {
    display: 'inline'
  },

  messageContentCurrentUser:{
    backgroundColor: '#e6dcff'
  }

});

class PermanentDrawer extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>

          <ChatHeader/>
          <Sidebar chatList={chatList} />
          <Chat messageList={messageList}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PermanentDrawer);
