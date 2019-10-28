import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteBook, deleteBookInList } from "../../../actions/books";

import { StyledButton } from "./style";

const DeleteButton = ({ id, deleteBook, deleteBookInList, inList }) => {
  const onSubmit = e => {
    e.preventDefault();
    inList ? deleteBook(id) : deleteBookInList(id);
  };

  return <StyledButton onClick={onSubmit}>Delete</StyledButton>
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  deleteBook: PropTypes.func.isRequired,
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { deleteBook, deleteBookInList }
)(DeleteButton);
