/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';

const styles = () => ({
  chatList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const ChatList = ({ classes, chatList, disabled }) => (
  <List className={classes.chatList} component="nav">
    {chatList && chatList.map(chatItem => (
      <ChatListItem disabled={disabled} key={chatItem._id} {...chatItem} chatId={chatItem._id} />
    ))}
  </List>
);

export default withStyles(styles)(ChatList);
