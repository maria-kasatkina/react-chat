import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChatAvatar from './ChatAvatar';

const ChatListItem = ({classes, title, date}) => (
  <ListItem button>
    <ChatAvatar colorFrom={title}>{title}</ChatAvatar>
    <ListItemText primary={title} secondary={date} />
  </ListItem>
);

export default ChatListItem;
