import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';

import InlineError from '../../messages/inline-error';

import * as S from "./style";

class LoginForm extends Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
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

  onSubmit = () => {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      this.setState({
        loading: true
      });
      this.props
        .submit(data)
        .catch(err => {
          this.setState({
            errors: err.response.data.errors,
            loading: false
          });
        });
    }
  };

  validate = (data) => {
    const errors = {};

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email';
    }

    if (!data.password) {
      errors.password = 'Can\'t be blank';
    }

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
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
