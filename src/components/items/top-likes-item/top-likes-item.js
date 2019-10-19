import React from "react";
import PropTypes from "prop-types";

const TopLikesItem = ({ book }) => {
  return (
    <article>
      <img src={book.image_url} alt="" />
      <p>book.title</p>
    </article>
  )
};

export default TopLikesItem;
