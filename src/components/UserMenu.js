import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import UserProfileForm from './UserProfileForm';

const styles = theme => ({
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

class UserMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    currentUser: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    editUserProfile: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
    openModal: false,
  };

  toggleModal = () => {
    const { openModal } = this.state;
    this.setState({ openModal: !openModal });
    this.handleMenuClose();
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutClick = () => {
    const { onLogout } = this.props;
    onLogout();
  };

  render() {
    const {
      classes, currentUser, editUserProfile, disabled,
    } = this.props;
    const { anchorEl, openModal } = this.state;

    return (
      <React.Fragment>
        <Button disabled={disabled} color="inherit" aria-label="Add" onClick={this.handleMenuClick}>
          <AccountCircle />
        </Button>
        <Menu
          id="user-menu"
          onClose={this.handleMenuClose}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={this.toggleModal}>Edit Profile</MenuItem>
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
        </Menu>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={this.toggleModal}
          className={classes.modal}
        >
          <Paper className={classes.paper}>
            <UserProfileForm
              closeModal={this.toggleModal}
              currentUser={currentUser}
              onSubmit={editUserProfile}
            />
          </Paper>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
