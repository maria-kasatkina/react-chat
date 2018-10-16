import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  addChatButton: {
    position: 'absolute',
    right: '30px',
    bottom: '60px'
  },
});

const AddChatButton = ({classes}) => (
  <Button variant="fab" color="primary" aria-label="Add" className={classes.addChatButton}>
    <AddIcon />
  </Button>
);

export default withStyles(styles)(AddChatButton);
