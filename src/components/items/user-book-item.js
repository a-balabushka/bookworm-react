import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

class UserBookItem extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.submit(this.props.book._id)
      .catch((e) => console.log(e))
  };

  render() {
    const { book } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <p>{book.title}</p>
        <p>{book.authors}</p>
        <p>{book.pages}</p>
        <Button primary>Delete book</Button>
        <hr />
      </Form>
    )
  }
}

UserBookItem.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
  }).isRequired
};

export default UserBookItem;
