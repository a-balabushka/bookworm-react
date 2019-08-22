import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => {
  return <span style={{ color: '#983a38' }}>{ text }</span>
};

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
