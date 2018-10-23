import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  newMessageBlock: {
    width: 'calc(100% - 420px)',
    bottom: 0,
    padding: '24px',
    position: 'fixed'
  },
  messageWrapper: {
    width: '100%',
    padding: '20px'
  }
});

const NewMessageBlock = ({classes}) => (
  <div className={classes.newMessageBlock}>
    <Paper className={classes.messageWrapper}>
      <Input fullWidth placeholder="Type your message..." />
    </Paper>
  </div>
);

export default withStyles(styles)(NewMessageBlock);
