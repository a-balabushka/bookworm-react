import React, { Component } from "react";
import queryString from "query-string";
import { Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { searchByPage } from "../../../actions/books";

import SearchAllResultsItem from "../../items/search-all-results-item/search-all-results-item";
import {
  StyledSection,
  StyledHeadingH1,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchButton,
  PaginationDiv
} from "./style";

class SearchAllResultPage extends Component {
  state = {
    books: null,
    query: queryString.parse(this.props.location.search),
    inputValue: null,
    queryTimeSeconds: null,
    pageCount: null,
    totalResults: null,
    loading: false
  };

  componentDidMount() {
    this.fetchBooksByPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query.page !== prevState.query.page) {
      this.fetchBooksByPage();
    }
  }

  fetchBooksByPage = () => {
    const { query } = this.state;
    this.setState({ loading: true });
    this.props
      .searchByPage(query.q, query.page)
      .then(this.props.history.push(`/search?q=${query.q}&page=${query.page}`))
      .then(data =>
        this.setState({
          books: data.books,
          queryTimeSeconds: data.query_time_seconds,
          totalResults: data.total_results,
          loading: false
        })
      );
  };

  onPageChange = (e, data) => {
    this.setState({
      query: {
        ...this.state.query,
        page: data.activePage
      }
    });
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
    const {
      books,
      loading,
      query,
      totalResults,
      queryTimeSeconds
    } = this.state;
    return (
      <>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <StyledSection>
            <StyledHeadingH1>Search</StyledHeadingH1>
            <StyledSearchForm onSubmit={this.onSubmit}>
              <StyledSearchInput
                type="text"
                id="inputValue"
                name="inputValue"
                placeholder="Search by Book Title"
                defaultValue={this.state.query.q}
                onChange={this.onChange}
              />
              <StyledSearchButton>Search</StyledSearchButton>
            </StyledSearchForm>
            <span>
              Page {query.page} of about {totalResults} results (
              {queryTimeSeconds} seconds)
            </span>
            <hr />
            {books &&
              books.map(item => (
                <SearchAllResultsItem book={item} key={item.goodreadsId} />
              ))}
              <PaginationDiv>
                <Pagination
                  boundaryRange={0}
                  activePage={this.state.query.page}
                  defaultActivePage={this.state.query.page}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={4}
                  onPageChange={this.onPageChange}
                />
              </PaginationDiv>
          </StyledSection>
        )}
      </>
    );
  }
}

export default connect(
  null,
  { searchByPage }
)(SearchAllResultPage);
