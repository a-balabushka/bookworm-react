import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBookData, createBook } from "../../../actions/books";

import LikeForm from "../../forms/like-form/like-form";

class BookPage extends Component {
  state = {
    book: null,
    loadingBook: true,
    errors: {}
  };

  componentDidMount() {
    this.fetchBook();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const prevId = prevProps.match.params.id;
    if (id !== prevId) {
      this.setState({ loadingBook: true });
      this.fetchBook();
    }
  }

  fetchBook = () => {
    const { id } = this.props.match.params;
    this.props.fetchBookData(id).then(data =>
      this.setState({
        book: {
          ...data
        },
        loadingBook: false
      })
    );
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createBook(this.state.book).catch(err => {
      this.setState({
        loadingBook: false,
        errors: err.response.data.errors
      });
    });
  };

  render() {
    const { book } = this.state;
    return this.state.loadingBook ? (
      <h2>Loading...</h2>
    ) : (
      <section>
        <form onSubmit={this.onSubmit}>
          <h2>{book.title}</h2>
          <img src={book.image_url} alt={`${book.title} cover`} />
          <div>
            <button>Save</button>
          </div>
          {/*<div>{book.goodreadsId}</div>
        <div>{book.description}</div>
        <div>{book.authors}</div>
        <div>{book.average_rating}</div>
        <div>{book.pages}</div>
        <div>{book.publisher}</div>
        <div>{book.publication_month} / {book.publication_day} / {book.publication_year}</div>
        <div>{book.format}</div>*/}
        </form>
        <LikeForm id={book.goodreadsId} />
      </section>
    );
  }
}

BookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  fetchBookData: PropTypes.func.isRequired,
  createBook: PropTypes.func.isRequired,
};

export default connect(
  null,
  { fetchBookData, createBook }
)(BookPage);
