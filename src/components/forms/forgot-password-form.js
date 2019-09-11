import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from "semantic-ui-react";
import Validator from 'validator';
import InlineError from '../messages/inline-error';

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
      <Form onSubmit={this.onSubmit} loading={loading}>
        { !!errors.global && <Message negative>{errors.global}</Message> }
        <Form.Field error={ !!errors.email }>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={ errors.email } />}
        </Form.Field>
        <Button primary>Continue</Button>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
