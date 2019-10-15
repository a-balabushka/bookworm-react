import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  StyledContainer,
  StyledBookImg,
  StyledData,
  StyledTitle,
  StyledAuthor
} from "./style";

const DropdownBookItem = ({ book }) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={{ pathname: `/books/new/${book.goodreadsId}` }}
    >
      <StyledContainer>
        <StyledBookImg src={book.image_url} alt={`${book.title} cover`} />
        <StyledData>
          <StyledTitle>{book.title}</StyledTitle>
          <StyledAuthor>by {book.authors}</StyledAuthor>
        </StyledData>
      </StyledContainer>
    </Link>
  );
};

DropdownBookItem.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired
  }).isRequired
};

export default DropdownBookItem;
