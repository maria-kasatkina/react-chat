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
    {chatList.map((chatItem, index) => (
      <ChatListItem key={index} chatItem={chatItem}/>
    ))}
  </List>
);

export default withStyles(styles)(ChatList);
