import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../../actions/auth";

import LoginForm from "../../forms/login-form/login-form";

import * as S from "./style";

class LoginPage extends Component {
  submit = data =>
    this.props.login(data)
      .then(() => this.props.history.push("/"));

  render() {
    return (
      <S.Container>
        <S.Header>Login</S.Header>
        <LoginForm submit={this.submit} />
        <S.SingUp>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
              fontSize: "1em",
              fontWeight: "600",
              width: "100%",
              height: "100%",
              display: "block"
            }}
          >
            Sign up
          </Link>
        </S.SingUp>
        <S.ForgotPassword>
          <Link
            style={{
              textDecoration: "none",
              color: "#414141",
              fontSize: "0.8em",
            }}
            to="/forgot_password"
          >
            Forgot Password?
          </Link>
        </S.ForgotPassword>
      </S.Container>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(LoginPage);
