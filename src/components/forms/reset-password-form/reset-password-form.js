import React, { Component } from "react";
import PropTypes from "prop-types";
import { resetPasswordValidation } from "../../../utils/validation/reset-password-validation";
import InlineError from "../../messages/inline-error";

import * as S from "./style";

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      passwordConfirmation: ""
    },
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = resetPasswordValidation(data);

    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = "Password must match";
    }

    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      this.props.submit(data).catch(err => {
        this.setState({
          errors: err.response.data.errors
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

  render() {
    const { data, errors } = this.state;

    return (
      <S.Container onSubmit={this.onSubmit}>
        <S.Header> Reset password </S.Header>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            name="password"
            placeholder="Your new password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </S.FormField>

        <S.FormField>
          <S.FormInput
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Type it again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && (
            <InlineError text={errors.passwordConfirmation} />
          )}
        </S.FormField>
        <S.Button>Reset</S.Button>
      </S.Container>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
