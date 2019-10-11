import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from 'react-redux';
import { search } from '../../actions/books';

import DropdownBookList from "./dropdown-book-list";

class Search extends Component {
  state = {
    query: '',
    loading: false,
    books: []
  };

  handleChange = e => {
    clearTimeout(this.timer);
    this.setState({
      [e.target.id]: e.target.value
    });
    this.timer = setTimeout(this.fetchOptions, 500);
  };

  fetchOptions = () => {
    const { query } = this.state;
    if (query) {
      this.props.search(query).then(books => {
        this.setState({ books });
      });
    }
  };

  render() {
    return (
      <>
        <input
          id="query"
          type="text"
          placeholder="Search books"
          onChange={this.handleChange}
        />
        <DropdownBookList books={this.state.books}/>
      </>
    );
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired
};

export default connect(
  null,
  { search }
)(Search);
