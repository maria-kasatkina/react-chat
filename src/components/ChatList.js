import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';

const styles = theme => ({
  chatList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll'
  },
});

const ChatList = ({classes, chatList}) => (
  <List className={classes.chatList} component="nav">
    {chatList && chatList.map((chatItem) => (
      <ChatListItem key={chatItem._id} {...chatItem} chatId={chatItem._id}/>
    ))}
  </List>
);

export default withStyles(styles)(ChatList);
