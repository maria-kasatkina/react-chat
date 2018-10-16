import React from 'react';
import MessageItem from './MessageItem';
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
  messagesWrapper: {
    height: 'calc(100% - 120px)',
    overflowY: 'scroll',
    paddingBottom: '120px'
  }
});

class MessageList  extends React.Component {

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
      <div className={classes.messagesWrapper} ref="messagesWrapper">
        {messageList.map((messageItem, index) => (
          <MessageItem key={index} messageItem={messageItem}/>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(MessageList);

