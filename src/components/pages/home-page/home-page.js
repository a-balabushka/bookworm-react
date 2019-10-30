import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../actions/auth";
import { getTop } from "../../../actions/books";
import { allBooksSelector } from "../../../reducers/books";

import TopBooksList from "../../lists/top-books-list/top-books-list";
import CenterLoading from "../../loaders/center-loader/center-loader";

import { StyledContainer } from "./style";

class HomePage extends Component {
  componentDidMount() {
    this.props.getTop();
  }

  render() {
    const { books, loading } = this.props;

    return loading ? (
      <StyledContainer>
        <TopBooksList topLikes={true} books={books[0]} />
        <TopBooksList topLikes={false} books={books[1]} />
      </StyledContainer>
    ) : (
      <CenterLoading />
    );
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
    loading: state.books.loading
  };
}

export default connect(
  mapStateToProps,
  { getTop, logout: actions.logout }
)(HomePage);
