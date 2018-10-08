import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

  appBar: {
    width: `calc(100% - ${320}px)`,
  },

});

const ChatHeader = ({classes}) => (

  <AppBar
    position="absolute"
    className={classNames(classes.appBar)}
  >
    <Toolbar>
      <Typography variant="title" color="inherit" noWrap>
        Permanent drawer
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(ChatHeader);
