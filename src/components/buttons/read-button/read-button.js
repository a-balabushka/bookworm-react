import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { readBook, readBookInList } from "../../../actions/books";

import { StyledButton } from './style';

const ReadButton = ({ book, readBook, readBookInList, inList }) => {
  const onSubmit = e => {
    e.preventDefault();
    (inList ? readBookInList(book) : readBook(book))
      .then(() => toastr.success("Successful", "Changes installed successfully"))
      .catch(error => toastr.error("Server Error", error.response.data.error));
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
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { readBook, readBookInList }
)(ReadButton);
