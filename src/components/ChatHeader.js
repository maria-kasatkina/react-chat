/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu';
import ChatMenu from './ChatMenu';
import ChatAvatar from './ChatAvatar';

const styles = ({
  appBar: {
    width: 'calc(100% - 320px)',
  },
  title: {
    flex: 1,
    marginLeft: 15,
  },
});


const ChatHeader = ({
  classes, logout, currentUser, editUserProfile, activeChat, leaveChat, deleteChat, isConnected,
}) => (

  <AppBar
    position="absolute"
    className={classes.appBar}
  >
    <Toolbar>
      {activeChat ? (
        <React.Fragment>
          <ChatAvatar colorFrom={activeChat._id}>
            {activeChat.title}
          </ChatAvatar>
          <Typography variant="title" color="inherit" noWrap className={classes.title}>
            {activeChat.title}
            {currentUser.isChatMember
            && (
            <ChatMenu
              disabled={!isConnected}
              onLeaveChat={() => leaveChat(activeChat._id)}
              onDeleteChat={() => deleteChat(activeChat._id)}
              currentUser={currentUser}
            />
            )}
          </Typography>
        </React.Fragment>
      ) : (
        <Typography variant="title" color="inherit" noWrap className={classes.title}>
          Chat for a while
        </Typography>
      )}
      <UserMenu
        disabled={!isConnected}
        onLogout={logout}
        currentUser={currentUser}
        editUserProfile={editUserProfile}
      />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(ChatHeader);
