import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rating from "react-rating";
import { getBookData, getBookDataSuccess, getBookDataFailure } from "../../../actions/books";

import CenterLoading from "../../loaders/center-loader/center-loader";
import LikeButton from "../../buttons/like-button/like-button";
import ReadButton from "../../buttons/read-button/read-button";
import DeleteButton from "../../buttons/delete-button/delete-button";
import ReadProgressWidget from "../../widgets/read-progress-widget/read-progress-widget";

import * as S from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";
import PageError from "../../errors/page-error/page-error";

class BookPage extends Component {

  componentDidMount() {
    this.fetchBook();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const prevId = prevProps.match.params.id;
    if (id !== prevId) {
      this.fetchBook();
    }
  }

  fetchBook = () => {
    const { id } = this.props.match.params;
    const { getBookData, getBookDataSuccess, getBookDataFailure } = this.props;

    getBookData(id)
      .then(book => getBookDataSuccess(book))
      .catch(error => getBookDataFailure(error))
  };

  createDescription = () => {
    const { description } = this.props.book;
    return { __html: description };
  };

  render() {
    const { book, loading, error, confirmed } = this.props;

    if (loading) {
      return <CenterLoading />
    }

    if (error) {
      return <PageError title={error} />;
    }

    return (
      <S.Section>
        <S.Left>
          <S.Cover src={book.image_url} alt={`${book.title} cover`} />
          { confirmed && <div>
            {book.readStatus
              ? <DeleteButton id={book.goodreadsId} inList={false} />
              : <ReadButton book={book} inList={false}/> }
          </div> }

          { confirmed && <div>
            <LikeButton id={book.goodreadsId} likeStatus={book.likeStatus} inList={false}/>
          </div> }
        </S.Left>
        <S.Center>
          <S.Title>{book.title}</S.Title>
          <S.Author>by {book.authors}</S.Author>
          <S.Rating>
            <Rating
              initialRating={book.average_rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <S.RatingNum>{book.average_rating}</S.RatingNum>
          </S.Rating>
          <S.Description
            dangerouslySetInnerHTML={this.createDescription()}
          />
          <S.Publish>
            <div>
              {book.format}, pages {book.pages}
            </div>
            <div>
              Published {book.publication_month}/{book.publication_day}/
              {book.publication_year} by {book.publisher}
            </div>
          </S.Publish>
        </S.Center>
        { confirmed && book.readStatus && <S.Right>
          <S.ProgressHeader>Your progress</S.ProgressHeader>
          <ReadProgressWidget
            pages={book.pages}
            readPages={book.readPages}
            goodreadsId={book.goodreadsId}
            inList={false}
          />
        </S.Right> }
      </S.Section>
    );
  }
}

BookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  getBookData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    book: state.books.data,
    loading: state.books.loading,
    error: state.books.error,
    isAuthenticated: !!state.user.email,
    confirmed: state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { getBookData, getBookDataSuccess, getBookDataFailure }
)(BookPage);
