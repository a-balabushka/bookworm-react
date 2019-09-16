import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SearchBookForm from '../forms/search-book-form';
import BookForm from '../forms/book-form';
import { search } from '../../actions/books';

class NewBookPage extends Component {

  state = {
    book: null
  };

  change = (data) =>
    this.props.search(data);

  onBookSelect = book => {
    this.setState({
      book
    });
  };

  addBook = () => console.log('hi');

  render() {
    return(
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm
          change={this.change}
          onBookSelect={this.onBookSelect}
        />

        {this.state.book && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}

NewBookPage.propTypes = {
  search: PropTypes.func.isRequired
};

export default connect(null, { search })(NewBookPage);
