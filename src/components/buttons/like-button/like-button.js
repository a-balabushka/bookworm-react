import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, deleteLike } from "../../../actions/books";

import { StyledButton } from "./style";

const LikeButton = ({
  id,
  likeStatus,
  updateLike,
  updateErrors,
  addLike,
  deleteLike
}) => {
  const onSubmit = e => {
    e.preventDefault();
    if (likeStatus) {
      deleteLike(id)
        .then(result => updateLike(result))
        .catch(err => updateErrors(err.response.data.errors));
    } else {
      addLike(id)
        .then(result => updateLike(result))
        .catch(err => updateErrors(err.response.data.errors));
    }
  };

  return <StyledButton onClick={onSubmit}>{likeStatus ? "Dislike" : "Like"}</StyledButton>;
};

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  likeStatus: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired,
  updateLike: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLike, deleteLike }
)(LikeButton);
