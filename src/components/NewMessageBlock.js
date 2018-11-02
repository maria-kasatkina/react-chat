import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = () => ({
  newMessageBlock: {
    width: 'calc(100% - 420px)',
    bottom: 0,
    padding: '24px',
    position: 'fixed',
  },
  messageWrapper: {
    width: '100%',
    padding: '20px',
  },
});

class NewMessageBlock extends React.Component {
  state = {
    content: '',
  };

  handleSendMessage = (event) => {
    const { content } = this.state;
    const { sendMessage } = this.props;
    if (event.key === 'Enter' && content) {
      sendMessage(content);
      this.setState({ content: '' });
    }
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState({
      content: event.target.value,
    });
  };

  handleJoinChat = (event) => {
    event.persist();
    const { onJoinButtonClick } = this.props;
    onJoinButtonClick();
  };

  render() {
    const { classes, isChatMember, disabled } = this.props;
    const { content } = this.state;

    return (
      <div className={classes.newMessageBlock}>
        <Paper className={classes.messageWrapper}>
          {isChatMember ? (
            <Input
              fullWidth
              disabled={disabled}
              name="content"
              value={content}
              placeholder="Type your message..."
              onChange={this.handleInputChange}
              onKeyPress={this.handleSendMessage}
            />
          ) : (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={this.handleJoinChat}
              disabled={disabled}
            >
              Join chat
            </Button>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessageBlock);
