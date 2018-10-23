import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles  = theme => ({

});

class RegistrationForm extends React.Component {

  state = {
    username: {
      value: '',
      isValid: true
    },
    password: {
      value: '',
      isValid: true
    },
    repeatPassword:{
      value: '',
      isValid: true
    }
  };

  handleInputChange = (event) => {
    event.persist();
    const {name, value} = event.target;
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        value
      }
    }))
  };

  validate = () => {
    const { password, repeatPassword } = this.state;
    const isValid = password.value === repeatPassword.value;
    this.setState({
      password: { ...password, isValid },
      repeatPassword: { ...repeatPassword, isValid },
    });
    return isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }
    const {username, password, repeatPassword} = this.state;
    console.log('Register', username.value, password.value, repeatPassword.value);

    this.props.onSubmit(username.value, password.value);

  };

  render() {
    const {classes} = this.props;
    const {username, password, repeatPassword} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Username"
          name="username"
          required
          fullWidth
          className={classes.textField}
          margin="normal"
          value={username.value}
          onChange={this.handleInputChange}
          error={!username.isValid}
        />
        <TextField
          label="Password"
          name="password"
          required
          fullWidth
          type="password"
          className={classes.textField}
          margin="normal"
          value={password.value}
          onChange={this.handleInputChange}
          error={!password.isValid}
        />
        <TextField
          label="Repeat password"
          name="repeatPassword"
          required
          fullWidth
          type="password"
          className={classes.textField}
          margin="normal"
          value={repeatPassword.value}
          onChange={this.handleInputChange}
          error={!repeatPassword.isValid}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth>
          Sign up
        </Button>
      </form>
    )
  }
}


export default withStyles(styles)(RegistrationForm);
