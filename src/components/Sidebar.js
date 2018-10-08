import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import titleInitials from "../utils/title-initials";
import Drawer from '@material-ui/core/Drawer';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import ExploreIcon from '@material-ui/icons/Explore';
import RestoreIcon from '@material-ui/icons/Restore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const styles = theme => ({

  addChatButton: {
    position: 'absolute',
    right: '30px',
    bottom: '60px'
  },

  drawerPaper: {
    position: 'relative',
    width: 320,
    height: '100%',
    overflowY: 'initial'
  },

  toolbar: theme.mixins.toolbar,


});

const Sidebar = ({classes, chatList}) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.toolbar} >
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        className={classes.textField}
      />
    </div>
    <Divider />
    <List className={classes.chatList} component="nav">
      {chatList.map((chatItem, index) => (
        <ListItem key={index} button>
          <Avatar className={classes.avatar}>{titleInitials(chatItem.title)}</Avatar>
          <ListItemText primary={chatItem.title} secondary={chatItem.date} />
        </ListItem>
      ))}
    </List>
    <Button variant="fab" color="primary" aria-label="Add" className={classes.addChatButton}>
      <AddIcon />
    </Button>
    <BottomNavigation showLabels>
      <BottomNavigationAction label="My chats" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
    </BottomNavigation>
  </Drawer>
);

export default withStyles(styles)(Sidebar);

