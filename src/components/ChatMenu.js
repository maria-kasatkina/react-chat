import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ChatMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeaveChat = () => {
    const { onLeaveChat } = this.props;
    onLeaveChat();
    this.handleMenuClose();
  };

  handleDeleteChat = () => {
    const { onDeleteChat } = this.props;
    onDeleteChat();
    this.handleMenuClose();
  };

  render() {
    const { anchorEl } = this.state;
    const { currentUser, disabled } = this.props;

    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleMenuClick}
          disabled={disabled}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="chat-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          {currentUser.isCreator && <MenuItem onClick={this.handleDeleteChat}>Delete</MenuItem>}
          {currentUser.isMember && <MenuItem onClick={this.handleLeaveChat}>Leave</MenuItem>}
        </Menu>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
