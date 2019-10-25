import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createBook } from "../../../actions/books";

import { StyledButton } from './style';

const ReadButton = ({ book, createBook, updateReadStatus, updateErrors }) => {
  const onSubmit = e => {
    e.preventDefault();
    createBook(book)
      .then(updateReadStatus(true))
      .catch(err => updateErrors(err.response.data.errors));
  };

  return <StyledButton onClick={onSubmit}>Read</StyledButton>;
};

ReadButton.propTypes = {
  book: PropTypes.shape().isRequired,
  createBook: PropTypes.func.isRequired,
  updateReadStatus: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBook }
)(ReadButton);
