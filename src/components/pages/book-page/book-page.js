import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rating from "react-rating";
import { fetchBookData, checkRead, checkLike } from "../../../actions/books";

import CenterLoading from "../../loaders/center-loader/center-loader";
import LikeButton from "../../buttons/like-button/like-button";
import ReadButton from "../../buttons/read-button/read-button";
import DeleteButton from "../../buttons/delete-button/delete-button";
import ReadProgressWidget from "../../widgets/read-progress-widget/read-progress-widget";

import {
  StyledSection,
  StyledLeft,
  StyledCenter,
  StyledCover,
  StyledTitle,
  StyledAuthor,
  StyledDescription,
  StyledRating,
  StyledRatingNum,
  StyledPublish,
  StyledRight,
  StyledProgressHeader
} from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

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
      this.setState({
        book: { ...data },
        loadingBook: false
      });
    });
  };

  checkReadStatus = goodreadsId => {
    this.props.checkRead(goodreadsId).then(result =>
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

  createDescription = () => {
    return { __html: this.state.book.description };
  };

  render() {
    const { book, readStatus, likeStatus } = this.state;
    return this.state.loadingBook ? (
      <CenterLoading />
    ) : (
      <StyledSection>
        <StyledLeft>
          <StyledCover src={book.image_url} alt={`${book.title} cover`} />
          <div>
            {readStatus ? (
              <DeleteButton
                id={book.goodreadsId}
                updateErrors={this.updateErrors}
                updateReadStatus={value => this.setState({ readStatus: value })}
              />
            ) : (
              <ReadButton
                book={book}
                updateErrors={this.updateErrors}
                updateReadStatus={value => this.setState({ readStatus: value })}
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
        </StyledLeft>
        <StyledCenter>
          <StyledTitle>{book.title}</StyledTitle>
          <StyledAuthor>by {book.authors}</StyledAuthor>
          <StyledRating>
            <Rating
              initialRating={book.average_rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <StyledRatingNum>{book.average_rating}</StyledRatingNum>
          </StyledRating>
          <StyledDescription
            dangerouslySetInnerHTML={this.createDescription()}
          />
          <StyledPublish>
            <div>
              {book.format}, pages {book.pages}
            </div>
            <div>
              Published {book.publication_month}/{book.publication_day}/
              {book.publication_year} by {book.publisher}
            </div>
          </StyledPublish>
        </StyledCenter>
        <StyledRight>
          <StyledProgressHeader>Your progress</StyledProgressHeader>
          <ReadProgressWidget
            pages={book.pages}
            readPages={book.readPages}
            goodreadsId={book.goodreadsId}
            updateErrors={this.updateErrors}
            updateReadPages={this.updateReadPages}
          />
        </StyledRight>
      </StyledSection>
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
  { fetchBookData, checkRead, checkLike }
)(BookPage);
