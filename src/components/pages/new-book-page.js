import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SearchBookForm from '../forms/search-book-form';
import BookForm from '../forms/book-form';
import { search, fetchPages, createBook } from '../../actions/books';

class NewBookPage extends Component {

  state = {
    book: null,
    loadingBook: false
  };

  change = (data) =>
    this.props.search(data);

  onBookSelect = book => {
    this.setState({loadingBook: true});
    this.props.fetchPages(book.goodreadsId)
      .then(pages => this.setState({
        book: {
          ...book,
          pages
        },
        loadingBook: false
      }))
  };

  addBook = book =>
    this.props.createBook(book)
      .then(() => this.props.history.push('/dashboard'));

  render() {
    return(
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm
          change={this.change}
          onBookSelect={this.onBookSelect}
        />

        {this.state.loadingBook && <p>Loading....</p>}

        {this.state.book && !this.state.loadingBook && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}

NewBookPage.propTypes = {
  search: PropTypes.func.isRequired,
  fetchPages: PropTypes.func.isRequired,
  createBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { search, fetchPages, createBook })(NewBookPage);
