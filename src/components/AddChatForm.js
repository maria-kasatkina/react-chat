import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddChatForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  state = {
    title: {
      value: '',
      isValid: false,
    },
  };

  validate = () => {
    const { title } = this.state;
    const isValid = title.value.length > 0;
    this.setState({
      title: { ...title, isValid },
    });
    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }
    const { title } = this.state;
    const { onSubmit, toggleModal } = this.props;
    onSubmit(title.value);
    toggleModal();
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Typography component="h3" variant="h6" gutterBottom>
          Create new chat
        </Typography>
        <TextField
          label="New chat"
          name="title"
          required
          fullWidth
          margin="normal"
          onChange={this.handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Create
        </Button>
      </form>
    );
  }
}

export default AddChatForm;
