import React from "react";
import PropTypes from "prop-types";

import TopLikesItem from "../../items/top-likes-item/top-likes-item";

const TopLikesList = ({ books }) => {
  return (
    <section>
      {books &&
        books.map(item => <TopLikesItem key={item.goodreadsId} book={item} />)}
    </section>
  );
};

export default TopLikesList;
