import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import ChatAvatar from './ChatAvatar';

const ChatListItem = ({classes, title, date, chatId}) => (
  <ListItem button component={Link} to={`/chat/${chatId}`}>
      <ChatAvatar colorFrom={title}>{title}</ChatAvatar>
      <ListItemText primary={title} secondary={date} />
  </ListItem>
);

export default ChatListItem;
