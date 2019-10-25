import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Rating from "react-rating";

import { StyledSearchArticle, StyledCover, StyledDataDiv, StyledTitle, StyledAuthor, StyledRating, StyledRatingNum } from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

const SearchAllResultsItem = ({ book }) => {
  return (
    <Link to={{ pathname: `/books/new/${book.goodreadsId}` }}
          style={{ textDecoration: "none" }}
    >
      <StyledSearchArticle>
        <div>
          <StyledCover src={book.image_url} alt="" />
        </div>
        <StyledDataDiv>
          <StyledTitle>{book.title}</StyledTitle>
          <StyledAuthor>by {book.authors}</StyledAuthor>
          <StyledRating>
            <Rating
              initialRating={book.rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <StyledRatingNum>{book.rating}</StyledRatingNum>
          </StyledRating>
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
