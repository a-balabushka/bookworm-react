import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/inline-error";

class SingupForm extends Component {
  state = {
    data: {
      username: "",
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onSubmit = e => {
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
      this.props.submit(data).catch(err => {
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
    });
  };

  validate = data => {
    const errors = {};

    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email";
    }

    if (!data.password) {
      errors.password = "Can't be blank";
    }

    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p> {errors.global} </p>
          </Message>
        )}
        <Form.Field error={!!errors.username}>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={data.username}
            onChange={this.onChange}
          />
          {errors.username && <InlineError text={errors.username} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Sign up</Button>
      </Form>
    );
  }
}

SingupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SingupForm;
