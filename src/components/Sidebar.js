import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import RestoreIcon from '@material-ui/icons/Restore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AddChatButton from './AddChatButton';
import ChatList from './ChatList';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  drawerPaper: {
    position: 'relative',
    width: 320,
    overflowY: 'initial',
  },
  toolbar: theme.mixins.toolbar,
});

class Sidebar extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isConnected: PropTypes.bool.isRequired,
    chats: PropTypes.shape({
      activeChat: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
    }).isRequired,
    addNewChat: PropTypes.func.isRequired,
  };

  state = {
    chatTabValue: 0,
    searchValue: '',
  };

  handleChangeChatTab = (event, value) => {
    this.setState({ chatTabValue: value });
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState({
      searchValue: event.target.value,
    });
  };

  searching = (chats) => {
    const { searchValue } = this.state;
    return chats
      .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
  };

  render() {
    const {
      classes, chats, addNewChat, isConnected,
    } = this.props;
    const { chatTabValue, searchValue } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <TextField
            fullWidth
            id="chat-search"
            label="Search field"
            type="search"
            value={searchValue}
            className={classes.textField}
            onChange={this.handleInputChange}
          />
        </div>
        <Divider />
        <ChatList
          chatList={this.searching(chatTabValue === 0 ? chats.my : chats.all)}
          disabled={!isConnected}
        />
        <AddChatButton addNewChat={addNewChat} disabled={!isConnected} />
        <BottomNavigation showLabels value={chatTabValue} onChange={this.handleChangeChatTab}>
          <BottomNavigationAction label="My chats" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
        </BottomNavigation>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
