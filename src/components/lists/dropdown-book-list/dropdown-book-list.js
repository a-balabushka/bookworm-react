import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBookData } from "../../../actions/books";

import DropdownBookItem from "../../items/dropdown-book-item/dropdown-book-item";

import { StyledContainer, StyledAllResults } from "./style";

const DropdownBookList = ({ books, query, visibility }) => {
  const haveResults =
    Array.isArray(books) &&
    books.map(item => <DropdownBookItem key={item.goodreadsId} book={item} />);

  const notFound = typeof books === "string" && (
    <StyledAllResults>{books}</StyledAllResults>
  );

  const haveQuery = Array.isArray(books) && query && (
    <Link
      style={{ textDecoration: "none" }}
      to={{ pathname: "/search", search: `?q=${query}&page=1` }}
    >
      <StyledAllResults>Show all results for "{query}"</StyledAllResults>
    </Link>
  );

  return visibility ? (
    <StyledContainer>
      {haveResults}
      {haveQuery}
      {notFound}
    </StyledContainer>
  ) : null;
};

DropdownBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  query: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  getBookData: PropTypes.func.isRequired
};

export default connect(
  null,
  { getBookData }
)(DropdownBookList);
