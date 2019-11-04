import React from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";

import {
  StyledArticle,
  StyledLeft,
  StyledCover,
  StyledRight,
  StyledTitle,
  StyledAthor,
  StyledRating,
  StyledRatingNum,
  StyledDescription
} from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

const TopBooksItem = ({ book }) => {
  const createDescription = () => {
    const { description } = book;
    return { __html: description };
  };

  return (
    <StyledArticle>
      <StyledLeft>
        <StyledCover src={book.image_url} alt="" />
        <Link
          style={{
            textDecoration: "none",
            backgroundColor: "#EC6C10",
            padding: "0.25em 2.7em",
            color: "white",
            fontSize: "0.8em"
          }}
          to={`/books/new/${book.goodreadsId}`}
        >
          Open
        </Link>
      </StyledLeft>
      <StyledRight>
        <StyledTitle>{book.title}</StyledTitle>
        <StyledAthor>by {book.authors}</StyledAthor>
        <StyledRating>
          <Rating
            initialRating={book.average_rating}
            emptySymbol={<img src={starBorder} alt="star" />}
            fullSymbol={<img src={star} alt="star" />}
            readonly
          />
          <StyledRatingNum>{book.average_rating}</StyledRatingNum>
        </StyledRating>
        <StyledDescription dangerouslySetInnerHTML={createDescription()} />
      </StyledRight>
    </StyledArticle>
  );
};

export default TopBooksItem;
