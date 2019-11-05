import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loginValidation } from "../../../utils/validation/login-validation";

import InlineError from '../../messages/inline-error';

import * as S from "./style";

class LoginForm extends Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {}
  };

  onChange = e => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e.target.name]: e.target.value
      }
    })
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = loginValidation(data);
    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      this.props
        .submit(data)
        .catch(err => {
          this.setState({
            errors: err.response.data.errors
          });
        });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>
        <S.FormField>
          <S.FormInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={ errors.email } />}
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={ errors.password } />}
        </S.FormField>
        <S.LoginButton>Login</S.LoginButton>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
