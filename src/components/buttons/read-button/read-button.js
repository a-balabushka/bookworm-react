import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createBook } from "../../../actions/books";

import { StyledButton } from './style';

const ReadButton = ({ book, createBook }) => {
  const onSubmit = e => {
    e.preventDefault();
    createBook(book)
  };

  return <StyledButton onClick={onSubmit}>Read</StyledButton>;
};

ReadButton.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    average_rating: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    likeStatus: PropTypes.bool.isRequired,
    pages: PropTypes.string.isRequired,
    readPages: PropTypes.number,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string
  }).isRequired,
  createBook: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createBook }
)(ReadButton);
