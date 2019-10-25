import React, { Component } from "react";
import queryString from "query-string";
import { Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { searchByPage } from "../../../actions/books";

import SearchAllResultsList from "../../lists/search-all-results-list/search-all-results-list";
import CenterLoading from "../../loaders/center-loader/center-loader";

import {
  StyledContainer,
  StyledHeadingH1,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchButton,
  PaginationDiv,
  StyledResults
} from "./style";

import "./pagination.css";
class SearchAllResultPage extends Component {
  state = {
    books: null,
    query: queryString.parse(this.props.location.search),
    inputValue: null,
    queryTimeSeconds: null,
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

  handlePageChange = (e, data) => {
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
    return loading ? (
      <CenterLoading />
    ) : (
      <StyledContainer>
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
        <StyledResults>
          Page {query.page} of about {totalResults} results ({queryTimeSeconds}{" "}
          seconds)
        </StyledResults>
        <hr />
        <SearchAllResultsList books={books} />
        <hr />
        <PaginationDiv>
          <Pagination
            boundaryRange={0}
            activePage={this.state.query.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={2}
            totalPages={20}
            onPageChange={this.handlePageChange}
          />
        </PaginationDiv>
      </StyledContainer>
    );
  }
}

export default connect(
  null,
  { searchByPage }
)(SearchAllResultPage);
