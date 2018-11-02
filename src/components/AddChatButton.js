import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import AddChatForm from './AddChatForm';

const styles = theme => ({
  addChatButton: {
    position: 'absolute',
    right: '30px',
    bottom: '60px',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class AddChatButton extends React.Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { classes, addNewChat, disabled } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <Button
          variant="fab"
          disabled={disabled}
          color="primary"
          aria-label="Add"
          className={classes.addChatButton}
          onClick={this.toggleModal}
        >
          <AddIcon />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpen}
          onClose={this.toggleModal}
          className={classes.modal}
        >
          <Paper className={classes.paper}>
            <AddChatForm onSubmit={addNewChat} toggleModal={this.toggleModal} />
          </Paper>
        </Modal>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(AddChatButton);
