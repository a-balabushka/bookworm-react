import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../../../actions/auth';

import * as S from "./style";

class ConfirmationPage extends Component {

  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => {
        this.setState({
          loading: false,
          success: true
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          success: false
        })
      });
  }

  render() {
    const { loading, success } = this.state;

    return (
      <div>
        {loading && (
          <S.ContainerLoading>
            <S.Message>Validation your email...</S.Message>
          </S.ContainerLoading>
        )}

        {!loading && success && (
          <S.ContainerSuccess>
            <S.Message>Thank you. Your account has been verified</S.Message>
          </S.ContainerSuccess>
        )}

        {!loading &&
        !success && (
          <S.ContainerFailure>
            <S.Message>Ooops. Invalid token it seems.</S.Message>
          </S.ContainerFailure>
        )}
      </div>
    )
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
