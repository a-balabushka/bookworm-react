import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/confirm-email-message';

const DashboardPage = ({ isConfirmed }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}
  </div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps)(DashboardPage);
