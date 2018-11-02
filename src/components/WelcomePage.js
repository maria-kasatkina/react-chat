import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  tabsPaper: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    marginTop: 80,
  },
  tabContent: {
    padding: 24,
  },
});

class WelcomePage extends React.Component {
  state = {
    activeTab: 0,
  };

  handleChange = (event, activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const {
      classes, signup, login, isAuthenticated, error,
    } = this.props;
    const { activeTab } = this.state;

    if (isAuthenticated) {
      return (
        <Redirect to="/chat" />
      );
    }

    return (
      <React.Fragment>
        <AppBar
          position="absolute"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Chat for a while
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Paper className={classes.tabsPaper}>
              <AppBar position="static" color="default">
                <Tabs value={activeTab} onChange={this.handleChange} fullWidth>
                  <Tab label="Login" />
                  <Tab label="Sign up" />
                </Tabs>
              </AppBar>
              <div className={classes.tabContent}>
                {activeTab === 0 && <LoginForm onSubmit={login} />}
                {activeTab === 1 && <RegistrationForm onSubmit={signup} />}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <ErrorMessage error={error} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(WelcomePage);
