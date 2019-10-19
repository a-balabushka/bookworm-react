import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkLike, addLike, deleteLike } from "../../../actions/books";

class LikeForm extends Component {
  state = {
    like: false
  };

  componentDidMount() {
    this.props.checkLike(this.props.id)
      .then(result => this.setState({ like: result }));
  }

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props;

    const changeLike = like => this.setState({ like });

    if (this.state.like) {
      this.props.deleteLike(id).then(changeLike);
    } else {
      this.props.addLike(id).then(changeLike);
    }
  };

  render() {
    return <button onClick={this.onSubmit}>
      {this.state.like ? "Dislike" : "Like"}
    </button>
  }
}

LikeForm.propTypes = {
  id: PropTypes.string.isRequired,
  checkLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired
};

export default connect(null, { checkLike, addLike, deleteLike })(LikeForm);
