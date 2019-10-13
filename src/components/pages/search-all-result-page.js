import React, { Component } from "react";
import queryString from "query-string";
import { Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { searchByPage } from "../../actions/books";

import SearchAllResultItem from "../items/search-all-result-item";

class SearchAllResultPage extends Component {
  state = {
    books: null,
    query: queryString.parse(this.props.location.search),
    inputValue: null,
    queryTimeSeconds: null,
    pageCount: null,
    totalResults: null
  };

  componentDidMount() {
    this.fetchBooksByPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query.page !== prevState.query.page) {
      this.fetchBooksByPage();
    }
  };

  fetchBooksByPage = () => {
    const { query } = this.state;
    this.props
      .searchByPage(query.q, query.page)
      .then(this.props.history.push(`/search?q=${query.q}&page=${query.page}`))
      .then(data => this.setState({
        books: [...data.books],
        queryTimeSeconds: data.query_time_seconds,
        totalResults: data.total_results
      }));
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
    })
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      query: {
        q: this.state.inputValue,
        page: 1,
      }
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div>
        <h1></h1>
        <h1></h1>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            id="inputValue"
            name="inputValue"
            placeholder="Search by Book Title"
            defaultValue={this.state.query.q}
            onChange={this.onChange}
          />
          <button>Search</button>
        </form>

        <hr />
        {books &&
          books.map(item => (
            <SearchAllResultItem book={item} key={item.goodreadsId} />
          ))}
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
      </div>
    );
  }
}

export default connect(
  null,
  { searchByPage }
)(SearchAllResultPage);
