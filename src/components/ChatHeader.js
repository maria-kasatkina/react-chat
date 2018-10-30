import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu';
import ChatMenu from "./ChatMenu";

const styles = theme => ({
  appBar: {
    width: 'calc(100% - 320px)',
  },
  title: {
    flex: 1
  }
});


const ChatHeader = ({classes, logout, currentUser, editUserProfile, activeChat, leaveChat, deleteChat}) => (

  <AppBar
    position="absolute"
    className={classes.appBar}
  >
    <Toolbar>
      {activeChat ?
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
          {activeChat.title}
          {currentUser.isChatMember && <ChatMenu leaveChat={leaveChat} currentUser={currentUser} deleteChat={deleteChat} activeChatId={activeChat._id}/>}
        </Typography>
        :
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
          Chat for a while
        </Typography>
      }
      <UserMenu onLogout={logout} currentUser={currentUser} editUserProfile={editUserProfile}/>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(ChatHeader);
