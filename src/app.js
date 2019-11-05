import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Loader from "react-loader";
import HomePage from "./components/pages/home-page/home-page";
import LoginPage from "./components/pages/login-page/login-page";
import DashboardPage from "./components/pages/dashboard-page/dashboard-page";
import SignUpPage from "./components/pages/singup-page/signup-page";
import ConfirmationPage from "./components/pages/confirmation-page/confirmation-page";
import ForgotPasswordPage from "./components/pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "./components/pages/reset-password-page";
import UserRoute from "./components/routes/user-route";
import GuestRoute from "./components/routes/guest-route";
import TopNavigation from "./components/navigation/top-navigation/top-navigation";
import { fetchCurrentUser } from "./actions/users";

import BookPage from "./components/pages/book-page/book-page";
import SearchAllResultPage from "./components/pages/search-all-results-page/search-all-result-page";

class App extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    const { location, loaded } = this.props;

    return (
      <div>
        <Loader loaded={loaded}>
          <TopNavigation />
          <Route location={location} path="/" exact component={HomePage} />
          <Route
            location={location}
            path="/confirmation/:token"
            exact
            component={ConfirmationPage}
          />
          <Route
            location={location}
            path="/search"
            component={SearchAllResultPage}
          />
          <Route
            location={location}
            path="/books/new/:id"
            exact
            component={BookPage}
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
        </Loader>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentUser }
)(App);
