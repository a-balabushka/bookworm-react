import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { StyledSearchArticle, StyledDataDiv } from "./style";

const SearchAllResultsItem = ({ book }) => {
  return (
    <Link to={{ pathname: `/books/new/${book.goodreadsId}` }}>
      <StyledSearchArticle>
        <div>
          <img src={book.image_url} alt=""/>
        </div>
        <StyledDataDiv>
          <div>{book.title}</div>
          <div>by {book.authors}</div>
          <div>Rating: {book.rating}</div>
        </StyledDataDiv>
      </StyledSearchArticle>
    </Link>
  );
};

SearchAllResultsItem.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired
  }).isRequired
};

export default SearchAllResultsItem;
