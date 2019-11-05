import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from "react-rating";

import DeleteButton from "../../buttons/delete-button/delete-button";
import LikeButton from "../../buttons/like-button/like-button";
import ReadProgressWidget from "../../widgets/read-progress-widget/read-progress-widget";

import { StyledArticle, StyledLeft, StyledCover, StyledCenter, StyledRight, StyledTitle, StyledAuthor, StyledRating, StyledRatingNum, StyledButtonsDiv, StyledProgressH5, StyledButtonItem } from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";
import ReadButton from "../../buttons/read-button/read-button";

class UserBookItem extends Component {

  render() {
    const { book } = this.props;
    return (
      <StyledArticle>
        <StyledLeft>
          <StyledCover src={book.image_url} alt="Cover"/>
        </StyledLeft>
        <StyledCenter>
          <StyledTitle>{book.title}</StyledTitle>
          <StyledAuthor>{book.authors}</StyledAuthor>
          <StyledRating>
            <Rating
              initialRating={book.average_rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <StyledRatingNum>{book.average_rating}</StyledRatingNum>
          </StyledRating>
          <StyledButtonsDiv>
            <StyledButtonItem>
              {book.readStatus
                ? <DeleteButton id={book.goodreadsId} inList={true} />
                : <ReadButton book={book} inList={true} />
              }
            </StyledButtonItem>
            <StyledButtonItem>
              <LikeButton
                id={book.goodreadsId}
                likeStatus={book.likeStatus}
                inList={true}
              />
            </StyledButtonItem>
          </StyledButtonsDiv>
        </StyledCenter>
        <StyledRight>
          <StyledProgressH5>Your progress</StyledProgressH5>
          <ReadProgressWidget
            pages={book.pages}
            readPages={book.readPages}
            goodreadsId={book.goodreadsId}
            inList={true}
          />
        </StyledRight>
      </StyledArticle>
    )
  }
}

UserBookItem.propTypes = {
  book: PropTypes.shape({
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
};

export default UserBookItem;
