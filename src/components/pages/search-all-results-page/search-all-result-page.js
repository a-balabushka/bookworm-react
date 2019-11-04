import React, { Component } from "react";
import queryString from "query-string";
import { Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  searchByPage,
  searchBooksSuccess,
  searchBooksFailure
} from "../../../actions/books";

import PageError from "../../errors/page-error/page-error";
import SearchAllResultsList from "../../lists/search-all-results-list/search-all-results-list";

import * as S from "./style";
import "./pagination.css";

class SearchAllResultPage extends Component {
  state = {
    query: queryString.parse(this.props.location.search),
    inputValue: null
  };

  componentDidMount() {
    if (this.state.query.q === '') {
      this.props.history.push('/');
      return
    }
    this.fetchBooksByPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.fetchBooksByPage();
    }
  }

  fetchBooksByPage = () => {
    const { query } = this.state;
    const {
      history,
      searchByPage,
      searchBooksSuccess,
      searchBooksFailure
    } = this.props;

    if (this.state.query.q === '') {
      toastr.error('Error', "Invalid value");
      return
    }

    searchByPage(query.q, query.page)
      .then(history.push(`/search?q=${query.q}&page=${query.page}`))
      .then(books => searchBooksSuccess(books))
      .catch(error => searchBooksFailure(error));
  };

  handlePageChange = (e, data) => {
    this.setState({
      query: {
        ...this.state.query,
        page: data.activePage
      }
    });

    const input = document.getElementById("inputValue");
    input.scrollIntoView({block: "center", behavior: "smooth"});
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      query: {
        q: this.state.inputValue,
        page: 1
      }
    });
  };

  render() {
    const { books, loading, query_time_seconds, total_results, error } = this.props;
    const { query } = this.state;
    const isBookString = typeof(books) === 'string';
    const length = typeof(books) === "object" ? books.length : false;

    const result = isBookString
      ? <p>{books}</p>
      : <SearchAllResultsList books={books} />;

    const statusOfResults = loading ? <S.Results>loading...</S.Results> : (
      <S.Results>
        Page {query.page} of about {total_results} results (
        {query_time_seconds} seconds)
      </S.Results>
    );

    const pagination = loading || isBookString || length
      ? null
      : (
      <>
        <hr />
        <S.PaginationDiv>
          <Pagination
            boundaryRange={0}
            activePage={query.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={2}
            totalPages={20}
            onPageChange={this.handlePageChange}
          />
        </S.PaginationDiv>
      </>
    );

    if (error) {
      return <PageError title={error} />;
    }

    return (
      <S.Container>
        <S.HeadingH1>Search</S.HeadingH1>
        <S.SearchForm onSubmit={this.onSubmit}>
          <S.SearchInput
            type="text"
            id="inputValue"
            name="inputValue"
            placeholder="Search by Book Title"
            defaultValue={query.q}
            onChange={this.onChange}
          />
          <S.SearchButton>Search</S.SearchButton>
        </S.SearchForm>
        {statusOfResults}
        <hr />
        {result}
        {pagination}
      </S.Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.data.books,
    query_time_seconds: state.books.data.query_time_seconds,
    total_results: state.books.data.total_results,
    loading: state.books.loading,
    error: state.books.error
  };
}

export default connect(
  mapStateToProps,
  { searchByPage, searchBooksSuccess, searchBooksFailure }
)(SearchAllResultPage);
