import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserBookItem from "../../items/user-book-item/user-book-item";
import { deleteBook } from '../../../actions/books';

import { StyledContainer } from "./style";

const UserBooksList = ({ books, deleteBook }) => {
  const deleteBookItem = id => deleteBook(id);

  return (
    <StyledContainer>
      {books &&
        books.map(item => (
          <UserBookItem book={item} key={item._id} submit={deleteBookItem} />
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
      pages: PropTypes.number.isRequired,
      readPages: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string
    }).isRequired
  ).isRequired,
  deleteBook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(UserBooksList);
