import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ChatAvatar from './ChatAvatar';
import getColor from '../utils/color-from';

const styles = theme => ({
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
  }
});

class MessageItem extends React.Component {

  render() {
    const {classes, sender, content, date} = this.props;
    const isMyMessage = (sender === 'me');
    const userAvatar = ( <ChatAvatar colorFrom={sender}>{sender}</ChatAvatar>);
    return (
      <div className={classNames(
        classes.messageWrapper,
        isMyMessage && classes.myMessageWrapper
      )}
      >
        {!isMyMessage && userAvatar}
        <Paper className={classNames(
          classes.message,
          isMyMessage && classes.myMessage
        )}
        >
          <Typography variant="caption" style={{ color: getColor(sender) }}>
            {sender}
          </Typography>
          <Typography variant="body1">
            {content}
          </Typography>
          <Typography variant="caption">
            {date}
          </Typography>
        </Paper>
        {isMyMessage && userAvatar}
      </div>
    )
  };
}

export default withStyles(styles)(MessageItem);

