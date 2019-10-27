import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../../actions/auth';

import ForgotPasswordForm from '../../forms/forgot-password-form/forgot-password-form';

import { Container, Header } from "./style";

class ForgotPasswordPage extends Component {

  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => {
        this.setState({
          success: true
        })
      });

  render() {
    return (
      <Container>
        {this.state.success ? (
          <Message>Email has been sent.</Message>
          ) : (
            <>
              <Header>Forgot password</Header>
              <ForgotPasswordForm submit={this.submit} />
            </>
          )}
      </Container>
    )
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
