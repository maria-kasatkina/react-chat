import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles  = theme => ({

});

class UserProfileForm extends React.Component {

  state = {
    username: this.props.currentUser.username,
    firstName: this.props.currentUser.firstName,
    lastName: this.props.currentUser.lastName
  };

  handleInputChange = (event) => {
    event.persist();
    const {name, value} = event.target;
    this.setState((prevState) => ({
      [name]: value
    }))
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {username, firstName, lastName} = this.state;
    this.props.onSubmit(username, firstName, lastName);
    this.props.closeModal();
  };

  render() {
    const { username, firstName, lastName } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Typography component="h3" variant="title" gutterBottom>
          Edit profile
        </Typography>
        <TextField
          required
          fullWidth
          name="username"
          label="Username"
          placeholder="Enter you username..."
          type="text"
          margin="normal"
          value={username}
          onChange={this.handleInputChange}
        />
        <TextField
          fullWidth
          name="firstName"
          label="First name"
          placeholder="Enter you first name..."
          type="text"
          margin="normal"
          value={firstName}
          onChange={this.handleInputChange}
        />
        <TextField
          fullWidth
          name="lastName"
          label="Last name"
          placeholder="Enter you last name..."
          type="text"
          margin="normal"
          value={lastName}
          onChange={this.handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(UserProfileForm);
