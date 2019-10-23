import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createBook } from "../../../actions/books";

const ReadButton = ({ book, createBook, updateReadStatus, updateErrors }) => {
  const onSubmit = e => {
    e.preventDefault();
    createBook(book)
      .then(updateReadStatus(true))
      .catch(err => updateErrors(err.response.data.errors));
  };

  return <button onClick={onSubmit}>Read</button>;
};

ReadButton.propTypes = {
  book: PropTypes.shape().isRequired, // TODO дописать shape
  createBook: PropTypes.func.isRequired,
  updateReadStatus: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBook }
)(ReadButton);
