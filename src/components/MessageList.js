/* eslint no-underscore-dangle: 0 */
import React from 'react';
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
          {messageList && messageList.map(messageItem => (
            <MessageItem key={messageItem._id} currentUser={currentUser} {...messageItem} />
          ))}
        </div>
      );
    }

    return (
      <div className={classes.noMessageWrapper}>
        <Typography variant="display1" gutterBottom>
          There is no message yet
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(MessageList);
