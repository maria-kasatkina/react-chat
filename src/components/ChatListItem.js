import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import ChatAvatar from './ChatAvatar';

const ChatListItem = ({
  title, createdAt, chatId, disabled,
}) => (
  <ListItem disabled={disabled} button component={Link} to={`/chat/${chatId}`}>
    <ChatAvatar colorFrom={chatId}>{title}</ChatAvatar>
    <ListItemText primary={title} secondary={moment(createdAt).fromNow()} />
  </ListItem>
);

ChatListItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ChatListItem;
