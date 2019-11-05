import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addLike,
  deleteLike,
  addLikeInList,
  deleteLikeInList
} from "../../../actions/books";

import { StyledButton } from "./style";
import { toastr } from "react-redux-toastr";

const LikeButton = ({
  id,
  likeStatus,
  addLike,
  deleteLike,
  inList,
  deleteLikeInList,
  addLikeInList
}) => {
  const onSubmit = e => {
    e.preventDefault();
    if (inList) {
      (likeStatus ? deleteLikeInList(id) : addLikeInList(id))
        .then(() => toastr.success("Successful", "Changes installed successfully"))
        .catch(error => toastr.error("Server Error", error.response.data.error))
    } else {
      (likeStatus ? deleteLike(id) : addLike(id))
        .then(() => toastr.success("Successful", "Changes installed successfully"))
        .catch(error => toastr.error("Server Error", error.response.data.error))
    }
  };

  return (
    <StyledButton onClick={onSubmit}>
      {likeStatus ? "Dislike" : "Like"}
    </StyledButton>
  );
};

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  likeStatus: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  addLikeInList: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  deleteLikeInList: PropTypes.func.isRequired,
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { addLike, deleteLike, addLikeInList, deleteLikeInList }
)(LikeButton);
