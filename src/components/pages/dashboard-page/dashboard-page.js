import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allBooksSelector } from "../../../reducers/books";
import { fetchBooks } from "../../../actions/books";

import ConfirmEmailMessage from "../../messages/confirm-email-message";
import UserBooksList from "../../lists/user-books-list/user-books-list";
import CenterLoading from "../../loaders/center-loader/center-loader";

class DashboardPage extends Component {

  componentDidMount() {
    const { fetchBooks } = this.props;
    fetchBooks();
  }

  render() {
    const { isConfirmed, books, loading } = this.props;
    return loading ? (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 ? <h3>No books(</h3> : (
          <UserBooksList books={books} />
        )}
      </div>
    ) : (
      <CenterLoading />
    )
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
  fetchBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state),
    loading: state.books.loading
  };
}

export default connect(
  mapStateToProps,
  { fetchBooks }
)(DashboardPage);
