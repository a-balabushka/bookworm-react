import React, { Fragment } from "react";
import PropTypes from "prop-types";

import TopBooksItem from "../../items/top-books-item/top-books-item";

import * as S from "./style";

const TopBooksList = ({ books, topLikes }) => {
  return (
    <Fragment>
      <h2>{topLikes ? "Top likes" : "Top reads"}</h2>
      <S.Section>
        {Array.isArray(books) &&
          books.map(item => (
            <TopBooksItem key={item.goodreadsId} book={item} />
          ))}
      </S.Section>
    </Fragment>
  );
};

TopBooksList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string
    }).isRequired
  ).isRequired,
  topLikes: PropTypes.bool.isRequired
};

export default TopBooksList;
