import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import WelcomePage from '../containers/WelcomePage';
import ChatPage from '../containers/ChatPage';
import configureStore from '../store';
import PrivateRoute from '../containers/PrivateRoute';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/(welcome)?" component={WelcomePage}/>
        <PrivateRoute path="/chat" component={ChatPage}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
