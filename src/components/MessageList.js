/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography';
import MessageItem from './MessageItem';

const styles = () => ({
  messagesWrapper: {
    height: 'calc(100% - 120px)',
    overflowY: 'scroll',
    paddingBottom: '120px',
  },

  noMessageWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

class MessageList extends React.Component {
  static propTypes = {
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
    currentUser: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
    }
  }

  render() {
    const { classes, messageList, currentUser } = this.props;

    if (messageList && messageList.length > 0) {
      return (
        <div
          className={classes.messagesWrapper}
          ref={(wrapper) => {
            this.messagesWrapper = wrapper;
          }}
        >
          {messageList
            && messageList.map(messageItem => (
              <MessageItem key={messageItem._id} currentUser={currentUser} {...messageItem} />
            ))}
        </div>
      );
    }

    return (
      <div className={classes.noMessageWrapper}>
        <Typography variant="h4" gutterBottom>
          There is no message yet
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(MessageList);
