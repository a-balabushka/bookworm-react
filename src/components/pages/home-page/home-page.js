import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTop, getTopSuccess, getTopFailure } from "../../../actions/books";
import { allBooksSelector } from "../../../reducers/books";

import TopBooksList from "../../lists/top-books-list/top-books-list";
import CenterLoading from "../../loaders/center-loader/center-loader";
import PageError from "../../errors/page-error/page-error";

import * as S from "./style";

class HomePage extends Component {
  componentDidMount() {
    const { getTop, getTopSuccess, getTopFailure } = this.props;
    getTop()
      .then(books => getTopSuccess(books))
      .catch(error => getTopFailure(error));
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      return <CenterLoading />;
    }

    if (error) {
      return <PageError title={error} />;
    }

    return (
      <S.Container>
        <TopBooksList topLikes={true} books={books[0]} />
        <TopBooksList topLikes={false} books={books[1]} />
      </S.Container>
    );
  }
}

HomePage.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        authors: PropTypes.string.isRequired,
        average_rating: PropTypes.number.isRequired,
        goodreadsId: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        _id: PropTypes.string
      }).isRequired
    ).isRequired
  ).isRequired,
  getTop: PropTypes.func.isRequired,
  getTopSuccess: PropTypes.func.isRequired,
  getTopFailure: PropTypes.func.isRequired,
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
