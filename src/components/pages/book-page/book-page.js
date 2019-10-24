import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBookData, checkRead, checkLike, saveProgress } from "../../../actions/books";

import LikeButton from "../../buttons/like-button/like-button";
import ReadButton from "../../buttons/read-button/read-button";
import DeleteButton from "../../buttons/delete-button/delete-button";
import ReadProgressWidget from "../../widgets/read-progress-widget/read-progress-widget";

class BookPage extends Component {
  state = {
    book: null,
    readStatus: false,
    likeStatus: false,
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
    this.props.fetchBookData(id).then(data => {
      const { goodreadsId } = data;
      this.checkReadStatus(goodreadsId);
      this.checkLikeStatus(goodreadsId);
      this.setState({ book: { ...data }, loadingBook: false });
    });
  };

  checkReadStatus = goodreadsId => {
    this.props
      .checkRead(goodreadsId)
      .then(result =>
        this.setState({
          readStatus: result.read,
          book: { ...this.state.book, readPages: result.readPages }
        })
      );
  };

  checkLikeStatus = goodreadsId => {
    this.props
      .checkLike(goodreadsId)
      .then(result => this.setState({ likeStatus: result }));
  };

  updateErrors = value => this.setState({ errors: value });

  updateReadPages = readPages => {
    this.setState({
      book: { ...this.state.book, readPages }
    });
  };

  render() {
    const { book, readStatus, likeStatus } = this.state;

    return this.state.loadingBook ? (
      <h2>Loading...</h2>
    ) : (
      <section>
        <h2>{book.title}</h2>
        <img src={book.image_url} alt={`${book.title} cover`} />
        <div>
          <ReadProgressWidget
            pages={book.pages}
            readPages={book.readPages}
            goodreadsId={book.goodreadsId}
            updateErrors={this.updateErrors}
            updateReadPages={this.updateReadPages}
          />
        </div>

        <div>
          {readStatus ? (
            <DeleteButton
              id={book.goodreadsId}
              updateErrors={this.updateErrors}
              updateReadStatus={value => this.setState({ readStatus: value})}
            />
          ) : (
            <ReadButton
              book={book}
              updateErrors={this.updateErrors}
              updateReadStatus={value => this.setState({ readStatus: value})}
            />
          )}
        </div>
        <div>
          <LikeButton
            id={book.goodreadsId}
            likeStatus={likeStatus}
            updateErrors={this.updateErrors}
            updateLike={value => this.setState({ likeStatus: value })}
          />
        </div>
        {/*<div>{book.goodreadsId}</div>
        <div>{book.description}</div>
        <div>{book.authors}</div>
        <div>{book.average_rating}</div>
        <div>{book.pages}</div>
        <div>{book.publisher}</div>
        <div>{book.publication_month} / {book.publication_day} / {book.publication_year}</div>
        <div>{book.format}</div>*/}
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
  checkRead: PropTypes.func.isRequired,
  checkLike: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchBookData, checkRead, checkLike, saveProgress }
)(BookPage);
