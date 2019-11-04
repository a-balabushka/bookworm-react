import React from "react";
import PropTypes from "prop-types";

import SearchAllResultsItem from "../../items/search-all-results-item/search-all-results-item";

import { StyledSection } from "./style";

const SearchAllResultsList = ({ books }) => {
  return (
    <StyledSection>
      {Array.isArray(books) &&
        books.map(item => (
          <SearchAllResultsItem book={item} key={item.goodreadsId} />
        ))}
    </StyledSection>
  );
};

export default SearchAllResultsList;
