import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import ChatAvatar from './ChatAvatar';

const ChatListItem = ({
  title, date, chatId, disabled,
}) => (
  <ListItem disabled={disabled} button component={Link} to={`/chat/${chatId}`}>
    <ChatAvatar colorFrom={chatId}>{title}</ChatAvatar>
    <ListItemText primary={title} secondary={date} />
  </ListItem>
);

export default ChatListItem;
