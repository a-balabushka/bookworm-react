import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DropdownBookItem = ({ book }) => {
  return (
    <Link to={{ pathname: `/books/new/${book.goodreadsId}` }}>
      <div>{book.title}</div>
    </Link>
  );
};

DropdownBookItem.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  }).isRequired
};

export default DropdownBookItem;
