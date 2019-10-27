import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../../actions/users';

import SignupForm from '../../forms/singup-form/signup-form';

import { Container, Header } from "./style";

class SignupPage extends Component {

  submit = data =>
    this.props.signup(data)
      .then(() => {
        this.props.history.push('/');
      });

  render() {
    return (
      <Container>
        <Header>Sing up</Header>
        <SignupForm submit={this.submit} />
      </Container>
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
