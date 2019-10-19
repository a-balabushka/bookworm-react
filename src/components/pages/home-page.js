import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import { getTopLikes } from "../../actions/books";

import TopLikesList from "../lists/top-likes-list/top-likes-list";
import { allBooksSelector } from "../../reducers/books";

class HomePage extends Component {
  state = {
    books: null,
    loading: false
  };

  componentDidMount() {
    this.onInit(this.props);
  }

  onInit = (props) => props.getTopLikes();

  render() {
    const { isAuthenticated, logout } = this.props;
    return (
      <div>
        <h1>Home Page</h1>

        {this.state.loading ? (
          <p>loading...</p>
        ) : (
          <TopLikesList books={this.props.books} />
        )}
        {isAuthenticated ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <div>
            <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    books: allBooksSelector(state)
  };
}

export default connect(
  mapStateToProps,
  { getTopLikes, logout: actions.logout }
)(HomePage);
