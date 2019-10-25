import React from "react";

import searchImg from "../../../img/search.png";
import { StyledContainer, StyledSearchImg, StyledSpinner } from "./style";

const SearchLoading = ({ loading }) => {
  return loading ? (
    <StyledContainer>
      <StyledSpinner viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </StyledSpinner>
    </StyledContainer>
  ) : (
    <StyledSearchImg src={searchImg} alt="Search" />
  );
};

export default SearchLoading;
