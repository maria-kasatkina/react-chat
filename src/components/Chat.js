import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MessageList from './MessageList';
import NewMessageBlock from './NewMessageBlock';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: '66px',
  },

  infoBlock: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const Chat = ({
  classes,
  messageList,
  sendMessage,
  joinChat,
  activeChat,
  currentUser,
  isConnected,
}) => (
  <main className={classes.content}>
    {activeChat ? (
      <React.Fragment>
        <MessageList messageList={messageList} currentUser={currentUser} />
        <NewMessageBlock
          disabled={!isConnected}
          sendMessage={sendMessage}
          isChatMember={currentUser.isChatMember}
          // eslint-disable-next-line
          onJoinButtonClick={() => joinChat(activeChat._id)}
        />
      </React.Fragment>
    ) : (
      <div className={classes.infoBlock}>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Start messaging…
          </Typography>
        </Paper>
      </div>
    )}
  </main>
);

Chat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  messageList: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      statusMessage: PropTypes.bool,
      sender: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        lastName: PropTypes.string,
        firstName: PropTypes.string,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sendMessage: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  isConnected: PropTypes.bool.isRequired,
};

Chat.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(Chat);
