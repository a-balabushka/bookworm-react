import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchBookData } from "../../actions/books";

class BookPage extends Component {
  state = {
    book: null,
    loadingBook: true
  };

  componentDidMount() {
    this.fetchBook();
  };

  componentDidUpdate = (prevProps) => {
    const { id } = this.props.match.params;
    const prevId =  prevProps.match.params.id;
    if(id !== prevId) {
      this.setState({ loadingBook: true });
      this.fetchBook();
    }
  };

  fetchBook = () => {
    const { id } = this.props.match.params;
    this.props.fetchBookData(id).then(data => this.setState({
      book: {
        ...data
      },
      loadingBook: false
    }))
  };

  render() {
    return (
      <>
        <h1></h1>
        {this.state.loadingBook ? <h1>Loading...</h1> : <h1>{this.state.book.title}</h1>}
      </>
    );
  }
}

BookPage.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
    id: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  fetchBookData: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchBookData }
)(BookPage);
