import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles  = theme => ({

});

class AddChatForm extends React.Component {

  state = {
    title: {
      value: '',
      isValid: false
    },
  };

  validate = () => {
    const isValid = this.state.title.value.length>0;
    this.setState({
      title: { ...this.state.title, isValid },
    });
    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }
    const {title} = this.state ;
    this.props.onSubmit(title.value);
    this.props.toggleModal();

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

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <Typography component="h3" variant="title" gutterBottom>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth>
          Create
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(AddChatForm);
