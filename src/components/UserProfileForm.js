import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class UserProfileForm extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    const { currentUser } = this.props;
    this.state = {
      username: currentUser.username,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };
  }

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, firstName, lastName } = this.state;
    const { onSubmit, closeModal } = this.props;
    onSubmit(username, firstName, lastName);
    closeModal();
  };

  render() {
    const { username, firstName, lastName } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Typography component="h3" variant="h6" gutterBottom>
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
    );
  }
}

export default UserProfileForm;
