import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import titleInitials from "../utils/title-initials";
import Avatar from '@material-ui/core/Avatar';
import deepPurple from "@material-ui/core/colors/deepPurple";

const styles = theme => ({
  avatar: {
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

const ChatAvatar = ({classes, name}) => (
  <Avatar className={classes.avatar}>{titleInitials(name)}</Avatar>
);

export default withStyles(styles)(ChatAvatar);
