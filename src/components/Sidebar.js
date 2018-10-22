import React from 'react';
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
    overflowY: 'initial'
  },
  toolbar: theme.mixins.toolbar,
});

class Sidebar extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {classes, chats, addNewChat} = this.props;
    const {value} = this.state;
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
            id="standard-search"
            label="Search field"
            type="search"
            className={classes.textField}
          />
        </div>
        <Divider/>
        <ChatList chatList={(this.state.value === 0)? chats.my : chats.all}/>
        <AddChatButton addNewChat={addNewChat}/>
        <BottomNavigation showLabels  value={value} onChange={this.handleChange}>
          <BottomNavigationAction label="My chats" icon={<RestoreIcon/>}/>
          <BottomNavigationAction label="Explore" icon={<ExploreIcon/>}/>
        </BottomNavigation>
      </Drawer>
    )
  }
}

export default withStyles(styles)(Sidebar);

