import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Loader from "react-loader";
import { IntlProvider } from 'react-intl';
import HomePage from "./components/pages/home-page";
import LoginPage from "./components/pages/login-page";
import DashboardPage from "./components/pages/dashboard-page";
import SignUpPage from "./components/pages/signup-page";
import ConfirmationPage from "./components/pages/confirmation-page";
import ForgotPasswordPage from "./components/pages/forgot-password-page";
import ResetPasswordPage from "./components/pages/reset-password-page";
import NewBookPage from "./components/pages/new-book-page";
import UserRoute from "./components/routes/user-route";
import GuestRoute from "./components/routes/guest-route";
import TopNavigation from "./components/navigation/top-navigation";
import { fetchCurrentUser } from './actions/users';
import messages from './messages';

import "semantic-ui-css/semantic.min.css";

class App extends Component {

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    const { location, isAuthenticated, loaded, lang } = this.props;

    return (
      <IntlProvider
        locale={lang}
        messages={messages[lang]}
      >
        <div className="ui container">
          <Loader loaded={loaded}>
            {isAuthenticated && <TopNavigation />}
            <Route location={location} path="/" exact component={HomePage} />
            <Route
              location={location}
              path="/confirmation/:token"
              exact
              component={ConfirmationPage}
            />
            <GuestRoute
              location={location}
              path="/login"
              exact
              component={LoginPage}
            />
            <GuestRoute
              location={location}
              path="/signup"
              exact
              component={SignUpPage}
            />
            <GuestRoute
              location={location}
              path="/forgot_password"
              exact
              component={ForgotPasswordPage}
            />
            <GuestRoute
              location={location}
              path="/reset_password/:token"
              exact
              component={ResetPasswordPage}
            />
            <UserRoute
              location={location}
              path="/dashboard"
              exact
              component={DashboardPage}
            />
            <UserRoute
              location={location}
              path="/books/new"
              exact
              component={NewBookPage}
            />
          </Loader>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded,
    lang: state.locale.lang
  };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
