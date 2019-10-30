import React, { Fragment } from "react";

import TopBooksItem from "../../items/top-books-item/top-books-item";

import { StyledSection } from "./style";

const TopBooksList = ({ books, topLikes }) => {
  return (
    <Fragment>
      <h2>{topLikes ? "Top likes" : "Top reads"}</h2>
      <StyledSection>
        {books &&
          books.map(item => (
            <TopBooksItem key={item.goodreadsId} book={item} />
          ))}
      </StyledSection>
    </Fragment>
  );
};

export default TopBooksList;
