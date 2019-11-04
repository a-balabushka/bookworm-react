import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { search } from "../../../actions/books";

import SearchLoading from "../../loaders/search-loading/search-loading";
import DropdownBookList from "../../lists/dropdown-book-list/dropdown-book-list";

import { StyledSearch, StyledSearchInput } from "./style";

class Search extends Component {
  state = {
    query: "",
    loading: false,
    books: [],
    visibilityDropdownList: false
  };

  myRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChange = e => {
    clearTimeout(this.timer);
    this.setState({
      [e.target.id]: e.target.value,
      visibilityDropdownList: false
    });
    this.timer = setTimeout(this.fetchOptions, 500);
  };

  fetchOptions = () => {
    const { query } = this.state;

    if (!query) {
      return;
    }

    this.setState({ loading: true });

    if (query) {
      this.props.search(query).then(books => {
        let booksHash;

        if (Array.isArray(books)) {
          booksHash = [];
          const booksCount = books.length > 5 ? 5 : books.length;

          for (let i = 0; i < booksCount; i++) {
            booksHash.push(books[i]);
          }
        } else {
          booksHash = books;
        }

        this.setState({
          books: booksHash,
          loading: false,
          visibilityDropdownList: true
        });
      });
    }
  };

  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ visibilityDropdownList: false });
    }
  };

  handleClickInside = () =>
    this.setState({ visibilityDropdownList: false });

  render() {
    const { books, loading, query, visibilityDropdownList } = this.state;
    return (
      <StyledSearch ref={this.myRef} onClick={this.handleClickInside}>
        <StyledSearchInput
          id="query"
          type="text"
          placeholder="Search books"
          onChange={this.handleChange}
        />
        <SearchLoading loading={loading} />
        <DropdownBookList
          books={books}
          query={query}
          visibility={visibilityDropdownList}
        />
      </StyledSearch>
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
