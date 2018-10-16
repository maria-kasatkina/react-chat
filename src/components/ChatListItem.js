import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChatAvatar from './ChatAvatar';

const ChatListItem = ({classes, chatItem}) => (
  <ListItem button>
    <ChatAvatar name={chatItem.title}/>
    <ListItemText primary={chatItem.title} secondary={chatItem.date} />
  </ListItem>
);

export default ChatListItem;
