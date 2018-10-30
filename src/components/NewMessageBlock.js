import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  newMessageBlock: {
    width: 'calc(100% - 420px)',
    bottom: 0,
    padding: '24px',
    position: 'fixed'
  },
  messageWrapper: {
    width: '100%',
    padding: '20px'
  }
});

class NewMessageBlock extends React.Component {

  state = {
    content: '',
  };

  handleSendMessage = (event) => {
    const { content } = this.state;
    if (event.key === 'Enter' && content) {
      this.props.sendMessage(content);
      this.setState({ content: ''});
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
    this.props.joinChat(this.props.activeChat._id);
  };

  render() {

    const {classes, isChatMember} = this.props;
    return (
      <div className={classes.newMessageBlock}>
        <Paper className={classes.messageWrapper}>
          {isChatMember ?
            <Input
              fullWidth
              name="content"
              value={this.state.content}
              placeholder="Type your message..."
              onChange={this.handleInputChange}
              onKeyPress={this.handleSendMessage}
            />
            :
            <Button fullWidth color="primary" variant="contained" onClick={this.handleJoinChat}>
              Join chat
            </Button>
          }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessageBlock);
