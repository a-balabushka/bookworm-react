import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveProgress } from "../../../actions/books";

class ReadProgressWidget extends Component {
  state = {
    readPages: null,
    visibilityProgress: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  saveProgressClick = e => {
    e.preventDefault();
    const {
      goodreadsId,
      saveProgress,
      updateReadPages,
      updateErrors
    } = this.props;
    const readPages = parseInt(this.state.readPages);
    saveProgress(readPages, goodreadsId)
      .then(readPages => {
        updateReadPages(readPages);
        this.setState({ visibilityProgress: false });
      })
      .catch(err => updateErrors(err.response.data.errors));
  };

  render() {
    const { pages, readPages } = this.props;
    const { visibilityProgress } = this.state;
    return visibilityProgress ? (
      <div>
        <input
          type="text"
          name="readPages"
          id="readPages"
          defaultValue={readPages}
          onChange={this.onChange}
        />
        <span>of {pages}</span>
        <button onClick={this.saveProgressClick}>Save</button>
      </div>
    ) : (
      <div>
        <progress value={readPages} max={pages} />
        <button onClick={() => this.setState({ visibilityProgress: true })}>
          Update progress
        </button>
      </div>
    );
  }
}

ReadProgressWidget.propTypes = {
  pages: PropTypes.number.isRequired,
  readPages: PropTypes.number.isRequired,
  goodreadsId: PropTypes.string.isRequired,
  updateErrors: PropTypes.func.isRequired,
  updateReadPages: PropTypes.func.isRequired
};

export default connect(
  null,
  { saveProgress }
)(ReadProgressWidget);
