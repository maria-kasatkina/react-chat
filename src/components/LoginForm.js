import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginForm extends React.Component {
  state = {
    username: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
  };

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit(username.value, password.value);
  };

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Username"
          name="username"
          required
          fullWidth
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
          margin="normal"
          value={password.value}
          onChange={this.handleInputChange}
          error={!password.isValid}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Login
        </Button>
      </form>
    );
  }
}

export default LoginForm;
