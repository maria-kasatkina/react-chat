import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { receiveAuth } from '../actions/auth';
import {Route, Redirect, withRouter} from 'react-router-dom';

class PrivateRoute extends React.Component{
  componentDidMount(){
    this.props.receiveAuth();
  }

  render(){
    const {component: Component, isAuthenticated, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render={props =>(
          isAuthenticated ? (
            <Component {...props} />
          ):(
            <Redirect
              to={{
                pathname: '/welcome',
                state: {from: props.location}
              }}
            />
          )
        )}
      />
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({
  receiveAuth
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute));
