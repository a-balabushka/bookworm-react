import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from "semantic-ui-react";
import InlineError from '../messages/inline-error';

class ResetPasswordForm extends Component {

  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
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

    if (!data.password) {
      errors.password = 'Can\'t be blank';
    }

    if (data.password !== data.passwordConfirmation) {
      errors.password = 'Password must match';
    }

    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={ !!errors.password }>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your new password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={ errors.password } />}
        </Form.Field>

        <Form.Field error={ !!errors.password }>
          <label htmlFor="passwordConfirmation">Confirm your new password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="type it again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && <InlineError text={ errors.passwordConfirmation } />}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    )
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
