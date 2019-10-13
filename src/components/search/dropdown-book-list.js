import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBookData } from "../../actions/books";

import DropdownBookItem from "./dropdown-book-item";

const DropdownBookList = ({ books, query }) => {
  return (
    <div>
      {books &&
        books.map(item => (
          <DropdownBookItem key={item.goodreadsId} book={item} />
        ))}
      {query && <Link to={{pathname: "/search", search: `?q=${query}&page=1`}}>
          <span>Show all result</span>
        </Link>}
    </div>
  );
};

DropdownBookList.propTypes = {
  books: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodReadsId: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  }).isRequired
};

export default connect(
  null,
  { fetchBookData }
)(DropdownBookList);
