import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import titleInitials from "../utils/title-initials";
import classNames from "classnames";

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({

});

class Chat extends React.Component {

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  componentDidMount() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const messagesWrapper = this.refs.messagesWrapper;

    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render() {
    const {classes, messageList} = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.messagesWrapper} ref="messagesWrapper">
          <div className={classes.toolbar}/>
          {messageList && messageList.map((messageItem, index) => {
            const isMyMessage = (messageItem.sender === 'me');
            const userAvatar = (
              <Avatar className={classes.avatar}>{titleInitials(messageItem.sender)}</Avatar>
            );
            return (
              <div key={index} className={classNames(
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
                  <Typography variant="caption" className={classes.purpleMessageUser}>
                    {messageItem.sender}
                  </Typography>
                  <Typography variant="body1">
                    {messageItem.content}
                  </Typography>
                  <Typography variant="caption">
                    {messageItem.date}
                  </Typography>
                </Paper>
                {isMyMessage && userAvatar}
              </div>
            )
          })}
          {/* status message */}
          <div className={classes.statusMessage}>
            <Typography>
              <Typography
                variant="caption"
                className={classNames(classes.statusMessageUser, classes.orange)}
              >zzzz
              </Typography>
              &nbsp;joined
              <Typography variant="caption">
                15 days ago
              </Typography>
            </Typography>
          </div>
          <Paper className={classes.joinChat}>
            <Button variant="contained" color="primary" className={classNames(classes.button, classes.joinButton)}>
              Join
            </Button>
          </Paper>
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(Chat);
