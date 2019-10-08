import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/confirm-email-message';
import { allBooksSelector } from '../../reducers/books';
import AddBook from '../ctas/add-book';
import UserBooksPage from '../pages/user-books-page';
import { fetchBooks } from '../../actions/books';

class DashboardPage extends Component {

  componentDidMount = () => {
    this.onInit(this.props).then(() => {
      localStorage.addedUserBooksId = this.createBookIdList();
    });
  };

  onInit = (props) => props.fetchBooks();

  createBookIdList = () => {
    const books = this.props.books;
    return JSON.stringify(books.map(item => item.goodreadsId));
  };

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 ? <AddBook /> : <UserBooksPage books={books} />}
      </div>
    )
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired,
  fetchBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  }
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
