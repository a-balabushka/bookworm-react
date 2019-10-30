import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rating from "react-rating";
import { fetchBookData } from "../../../actions/books";

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
    this.props.fetchBookData(id)
  };

  createDescription = () => {
    return { __html: this.props.book.description };
  };

  render() {
    const { book, loading, confirmed } = this.props;
    return loading ? (
      <StyledSection>
        <StyledLeft>
          <StyledCover src={book.image_url} alt={`${book.title} cover`} />
          { confirmed && <div>
            {book.readStatus
              ? <DeleteButton id={book.goodreadsId} inList={true} />
              : <ReadButton book={book} /> }
          </div> }

          { confirmed && <div>
            <LikeButton id={book.goodreadsId} likeStatus={book.likeStatus} inList={false}/>
          </div> }
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
        { confirmed && book.readStatus && <StyledRight>
          <StyledProgressHeader>Your progress</StyledProgressHeader>
          <ReadProgressWidget
            pages={book.pages}
            readPages={book.readPages}
            goodreadsId={book.goodreadsId}
            inList={false}
          />
        </StyledRight> }
      </StyledSection>
    ) : (
      <CenterLoading />
    );
  }
}

BookPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  fetchBookData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    book: state.books.data,
    loading: state.books.loading,
    isAuthenticated: !!state.user.email,
    confirmed: state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { fetchBookData }
)(BookPage);
