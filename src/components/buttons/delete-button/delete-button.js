import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteBook } from "../../../actions/books";

import { StyledButton } from "./style";

const DeleteButton = ({ id, deleteBook, updateReadStatus, updateErrors }) => {
  const onSubmit = e => {
    e.preventDefault();
    deleteBook(id)
      .then(result => updateReadStatus(result))
      .catch(err => updateErrors(err.response.data.errors));
  };

  return <StyledButton onClick={onSubmit}>Delete</StyledButton>
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  deleteBook: PropTypes.func.isRequired,
  updateReadStatus: PropTypes.func.isRequired,
  updateErrors: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(DeleteButton);
