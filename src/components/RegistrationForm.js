import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles  = theme => ({

});

const RegistrationForm = ({classes}) => (
  <form  noValidate autoComplete="off">
    <TextField
      id="standard-name"
      label="Username"
      required
      fullWidth
      className={classes.textField}
      margin="normal"
    />
    <TextField
      id="standard-name"
      label="Password"
      required
      fullWidth
      type="password"
      className={classes.textField}
      margin="normal"
    />
    <TextField
      id="standard-name"
      label="Repeat password"
      required
      fullWidth
      type="password"
      className={classes.textField}
      margin="normal"
    />
    <Button variant="contained" color="primary" className={classes.button} fullWidth>
      Sign up
    </Button>
  </form>
);

export default withStyles(styles)(RegistrationForm);
