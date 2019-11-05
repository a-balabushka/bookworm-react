import React from "react";
import PropTypes from "prop-types";
import UserBookItem from "../../items/user-book-item/user-book-item";

import { StyledContainer } from "./style";

const UserBooksList = ({ books }) => {

  return (
    <StyledContainer>
      {books &&
        books.map(item => (
          <UserBookItem book={item} key={item._id}  />
        ))}
    </StyledContainer>
  );
};

UserBooksList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      likeStatus: PropTypes.bool.isRequired,
      readStatus: PropTypes.bool.isRequired,
      pages: PropTypes.number.isRequired,
      readPages: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string
    }).isRequired
  ).isRequired,
};

export default UserBooksList;
