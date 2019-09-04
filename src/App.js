import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/home-page';
import LoginPage from './components/pages/login-page';
import DashboardPage from './components/pages/dashboard-page';
import SignUpPage from './components/pages/signup-page';
import ConfirmationPage from './components/pages/confirmation-page';
import UserRoute from './components/routes/user-route';
import GuestRoute from './components/routes/guest-route';

import 'semantic-ui-css/semantic.min.css';

const App = ({ location }) => {
  return (
  <div className="ui container">
    <Route location={location} path="/" exact component={ HomePage } />
    <Route location={location} path="/confirmation/:token" exact component={ ConfirmationPage } />
    <GuestRoute location={location} path="/login" exact component={ LoginPage } />
    <GuestRoute location={location} path="/signup" exact component={ SignUpPage } />
    <UserRoute location={location} path="/dashboard" exact component={ DashboardPage } />
  </div>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
