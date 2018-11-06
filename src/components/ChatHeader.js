/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UserMenu from './UserMenu';
import ChatMenu from './ChatMenu';
import ChatAvatar from './ChatAvatar';

const styles = {
  appBar: {
    width: 'calc(100% - 320px)',
  },
  title: {
    flex: 1,
    marginLeft: 15,
  },
};

const ChatHeader = ({
  classes,
  logout,
  currentUser,
  editUserProfile,
  activeChat,
  leaveChat,
  deleteChat,
  isConnected,
}) => (
  <AppBar position="absolute" className={classes.appBar}>
    <Toolbar>
      {activeChat ? (
        <React.Fragment>
          <ChatAvatar colorFrom={activeChat._id}>{activeChat.title}</ChatAvatar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            {activeChat.title}
            {currentUser.isChatMember && (
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
        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
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

ChatHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  editUserProfile: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

ChatHeader.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatHeader);
