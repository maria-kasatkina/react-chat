/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import ChatAvatar from './ChatAvatar';
import getColor from '../utils/color-from';

const styles = () => ({
  messageWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 24px',
  },
  message: {
    padding: '8px',
    width: 'fit-content',
    maxWidth: '70%',
    minWidth: '10%',
    marginLeft: '16px',
    margin: '0 0 0 13px',
  },
  myMessageWrapper: {
    justifyContent: 'flex-end',
  },
  myMessage: {
    margin: '0 13px 0 0',
    backgroundColor: '#e6dcff',
  },
  statusMessage: {
    width: '100%',
    textAlign: 'center',
  },
});

const MessageItem = ({
  classes, sender, content, createdAt, statusMessage, currentUser,
}) => {
  const isMyMessage = currentUser._id === sender._id;
  const userAvatar = <ChatAvatar colorFrom={sender.username}>{sender.username}</ChatAvatar>;

  if (statusMessage) {
    return (
      <div className={classes.messageWrapper}>
        <Typography className={classes.statusMessage}>
          <Typography variant="caption" style={{ color: getColor(sender.username) }}>
            {sender.username}
          </Typography>
          {content}
          <Typography variant="caption">{moment(createdAt).fromNow()}</Typography>
        </Typography>
      </div>
    );
  }

  return (
    <div className={classNames(classes.messageWrapper, isMyMessage && classes.myMessageWrapper)}>
      {!isMyMessage && userAvatar}
      <Paper className={classNames(classes.message, isMyMessage && classes.myMessage)}>
        <Typography variant="caption" style={{ color: getColor(sender.username) }}>
          {sender.username}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption">{moment(createdAt).fromNow()}</Typography>
      </Paper>
      {isMyMessage && userAvatar}
    </div>
  );
};

MessageItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  content: PropTypes.string.isRequired,
  sender: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  statusMessage: PropTypes.bool,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
};

MessageItem.defaultProps = {
  statusMessage: false,
};

export default withStyles(styles)(MessageItem);
