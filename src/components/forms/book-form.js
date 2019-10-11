import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment, Image } from "semantic-ui-react";
import InlineError from "../messages/inline-error";

class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages,
      rating: this.props.book.rating,
      description: this.props.book.description,
      format: this.props.book.format,
      publication_day: this.props.book.publication_day,
      publication_month: this.props.book.publication_month,
      publication_year: this.props.book.publication_year,
      publisher: this.props.book.publisher
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (this.props.book.goodreadsId !== prevProps.book.goodreadsId) {
      this.setState({
        data: {
          goodreadsId: this.props.book.goodreadsId,
          title: this.props.book.title,
          authors: this.props.book.authors,
          cover: this.props.book.covers[0],
          pages: this.props.book.pages,
          rating: this.props.book.rating,
          description: this.props.book.description,
          format: this.props.book.format,
          publication_day: this.props.book.publication_day,
          publication_month: this.props.book.publication_month,
          publication_year: this.props.book.publication_year,
          publisher: this.props.book.publisher
        },
        covers: this.props.book.covers
      });
    }
  }

  onChange = e => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e.target.name]: e.target.value
      }
    });
  };

  onChangeNumber = e => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      this.setState({
        loading: true
      });
      this.props.submit(data).catch(err => {
        this.setState({
          errors: err.response.data.errors,
          loading: false
        });
      });
    }
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: {
        ...this.state.data,
        cover: covers[newIndex]
      }
    });
  };

  validate = data => {
    const errors = {};

    if (!data.title) {
      errors.title = "Can't be blank";
    }

    if (!data.authors) {
      errors.authors = "Can't be blank";
    }

    if (!data.pages) {
      errors.pages = "Can't be blank";
    }

    return errors;
  };

  createDescription = () => {
    return {__html: this.state.data.description}
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>
                <Form.Field error={!!errors.description}>
                  <label htmlFor="description">Description</label>
                  <div dangerouslySetInnerHTML={this.createDescription()} />
                  {errors.description && <InlineError text={errors.description} />}
                </Form.Field>
                <Form.Field error={!!errors.authors}>
                  <label htmlFor="title">Book Authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>
                <Form.Field error={!!errors.pages}>
                  <label htmlFor="title">Pages</label>
                  <input
                    disabled={data.pages === undefined}
                    type="text"
                    id="pages"
                    name="pages"
                    value={
                      data.pages !== undefined ? data.pages : "Loading....."
                    }
                    onChange={this.onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
                <Form.Field error={!!errors.format}>
                  <label htmlFor="title">Format</label>
                  <input
                    type="text"
                    id="format"
                    name="format"
                    placeholder="Format"
                    value={data.format}
                    onChange={this.onChange}
                  />
                  {errors.format && <InlineError text={errors.format} />}
                </Form.Field>
                <Form.Field error={!!errors.format}>
                  <label htmlFor="title">Publisher</label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    placeholder="publisher"
                    value={data.publisher}
                    onChange={this.onChange}
                  />
                  {errors.publisher && <InlineError text={errors.publisher} />}
                </Form.Field>
                <Form.Field error={!!errors.format}>
                  <label htmlFor="title">Publication Date</label>
                  <p>{`${data.publication_day}/${data.publication_month}/${data.publication_year}`}</p>
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size="small" src={data.cover} />
                {this.state.covers.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changeCover}>
                    Another cover
                  </a>
                )}
                <p>{data.rating}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button disabled={this.props.check} primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number,
    rating: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    publication_day: PropTypes.string.isRequired,
    publication_month: PropTypes.string.isRequired,
    publication_year: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  }).isRequired,
  check: PropTypes.bool.isRequired
};

export default BookForm;
