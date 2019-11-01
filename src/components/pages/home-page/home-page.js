import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTop, getTopSuccess, getTopFailure } from "../../../actions/books";
import { allBooksSelector } from "../../../reducers/books";

import TopBooksList from "../../lists/top-books-list/top-books-list";
import CenterLoading from "../../loaders/center-loader/center-loader";
import PageError from "../../errors/page-error/page-error";

import { StyledContainer } from "./style";

class HomePage extends Component {
  componentDidMount() {
    const { getTop, getTopSuccess, getTopFailure } = this.props;
    getTop()
      .then(() => getTopSuccess())
      .catch(error => getTopFailure(error));
  }

  render() {
    const { books, loading, error } = this.props;
    let content;

    if (error) {
      content = <PageError title={error} />;
    } else {
      content = (
        <StyledContainer>
          <TopBooksList topLikes={true} books={books[0]} />
          <TopBooksList topLikes={false} books={books[1]} />
        </StyledContainer>
      );
    }

    return loading ? <CenterLoading /> : content;
  }
}

HomePage.propTypes = {
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
  getTop: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    books: allBooksSelector(state),
    loading: state.books.loading,
    error: state.books.error
  };
}

export default connect(
  mapStateToProps,
  { getTop, getTopSuccess, getTopFailure }
)(HomePage);
