import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';

import InlineError from '../../messages/inline-error';

import { Button, FormInput, FormField } from "./style";

class ForgotPasswordForm extends Component {

  state = {
    data: {
      email: '',
    },
    loading: false,
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();
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

  onChange = e => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e.target.name]: e.target.value
      }
    })
  };

  validate = (data) => {
    const errors = {};

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email';
    }

    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;

    return (
      <from onSubmit={this.onSubmit} loading={loading}>
        <FormField error={ !!errors.email }>
          <FormInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={ errors.email } />}
        </FormField>
        <Button>Continue</Button>
      </from>
    )
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
