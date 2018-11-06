/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
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
    {chatList
      && chatList.map(chatItem => (
        <ChatListItem disabled={disabled} key={chatItem._id} {...chatItem} chatId={chatItem._id} />
      ))}
  </List>
);

ChatList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  chatList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withStyles(styles)(ChatList);
