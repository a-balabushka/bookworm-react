import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../actions/auth";
import { getTop } from "../../../actions/books";
import { allBooksSelector } from "../../../reducers/books";

import TopBooksList from "../../lists/top-books-list/top-books-list";
import { StyledContainer } from './style';

class HomePage extends Component {
  componentDidMount() {
    this.onInit(this.props);
    this.setState({ loading: false });
  }

  onInit = (props) => props.getTop();

  render() {
    const { books, loading } = this.props;
    return (
      <StyledContainer>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <TopBooksList topLikes={true} books={books[0]} />
            <TopBooksList topLikes={false} books={books[1]} />
          </>
        )}
      </StyledContainer>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: allBooksSelector(state),
    loading: state.loading
  };
}

export default connect(
  mapStateToProps,
  { getTop, logout: actions.logout }
)(HomePage);
