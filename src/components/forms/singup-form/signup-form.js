import React, { Component } from "react";
import PropTypes from "prop-types";
import { signUpValidation } from "../../../utils/validation/signup-validation";

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
    const errors = signUpValidation(data);

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

    this.setState({ errors })
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

  render() {
    const { data, errors } = this.state;

    return (
      <S.Form onSubmit={this.onSubmit}>
        <S.FormField>
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
        <S.FormField>
          <S.FormInput
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
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
          {errors.password && <InlineError text={errors.password} />}
        </S.FormField>
        <S.SingUpButton>Sign up</S.SingUpButton>
      </S.Form>
    );
  }
}

SingupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SingupForm;
