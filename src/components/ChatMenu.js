import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ChatMenu extends React.Component {

  state = {
    anchorEl: null
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeaveChat = () => {
    this.props.leaveChat(this.props.activeChatId);
    this.handleMenuClose();
  };

  handleDeleteChat = () => {
    this.props.deleteChat(this.props.activeChatId);
    this.handleMenuClose();
  };

  render(){

    const { anchorEl } = this.state;
    const { currentUser } = this.props;

    return (
      <React.Fragment>
        <IconButton onClick={this.handleMenuClick}>
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
    )
  }
}

export default ChatMenu;
