import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";

import InlineError from "../../messages/inline-error";

import * as S from "./style";

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
      <form onSubmit={this.onSubmit} loading={loading}>
        <S.FormField error={!!errors.username}>
          <S.FormInput
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={data.username}
            onChange={this.onChange}
          />
          {errors.username && <InlineError text={errors.username} />}
        </S.FormField>
        <S.FormField error={!!errors.email}>
          <S.FormInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </S.FormField>
        <S.FormField error={!!errors.password}>
          <S.FormInput
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </S.FormField>
        <S.SingUpButton>Sign up</S.SingUpButton>
      </form>
    );
  }
}

SingupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SingupForm;
