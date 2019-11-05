import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allBooksSelector } from "../../../reducers/books";
import { getUserBooks, getUserBooksSuccess, getUserBooksFailure, changeFilters } from "../../../actions/books";

import ConfirmEmailMessage from "../../messages/confirm-email-message";
import UserBooksList from "../../lists/user-books-list/user-books-list";
import CenterLoading from "../../loaders/center-loader/center-loader";

class DashboardPage extends Component {

  componentDidMount() {
    const { getUserBooks, getUserBooksSuccess, getUserBooksFailure } = this.props;
    getUserBooks()
      .then(books => getUserBooksSuccess(books))
      .catch(error => getUserBooksFailure(error));
  }

  filterBooks = (books, filter) => {
    switch (filter) {
      case 'read':
        return books.filter(book => !book.likeStatus);
      case 'like':
        return books.filter(book => book.likeStatus);
      default:
        return books;
    }
  };

  render() {
    const { isConfirmed, books, loading, filter, changeFilters } = this.props;

    const filtersBtn = [
      { text: 'All', id: 'all', },
      { text: 'Read', id: 'read', },
      { text: 'Like', id: 'like' }
    ];
    const filterBooks = this.filterBooks(books, filter);
    if (loading) {
      return <CenterLoading />;
    }

    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        <h2>My books</h2>
        {filtersBtn.map(btn => (
          <button key={btn.id} onClick={() => changeFilters(btn.id)}>
            {btn.text}
          </button>
          ))}
        {books.length === 0 ? (
          <h3>No books(</h3>
        ) : (
          <UserBooksList books={filterBooks} />
        )}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
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
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getUserBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: allBooksSelector(state),
    loading: state.books.loading,
    error: state.books.error,
    filter: state.books.filter,
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { getUserBooks, getUserBooksSuccess, getUserBooksFailure, changeFilters }
)(DashboardPage);
