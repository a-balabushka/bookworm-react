import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserBookItem from "../items/user-book-item";
import { deleteBook } from '../../actions/books';

const UserBooksPage = ({ books, deleteBook }) => {
  const deleteBookItem = id => deleteBook(id);

  return (
    <section>
      {books &&
        books.map(item => (
          <UserBookItem book={item} key={item._id} submit={deleteBookItem} />
        ))}
    </section>
  );
};

UserBooksPage.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deleteBook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(UserBooksPage);
