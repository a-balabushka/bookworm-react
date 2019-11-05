import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { signup } from '../../../actions/users';

import SignupForm from '../../forms/singup-form/signup-form';

import * as S from "./style";

class SignupPage extends Component {

  submit = data =>
    this.props.signup(data)
      .then(() => {
        this.props.history.push('/');
      });

  render() {
    return (
      <S.Container>
        <S.Header>Sing up</S.Header>
        <SignupForm submit={this.submit} />
        <S.SingUp>
          <Link
            to="/login"
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
            Login
          </Link>
        </S.SingUp>
      </S.Container>
    )
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
