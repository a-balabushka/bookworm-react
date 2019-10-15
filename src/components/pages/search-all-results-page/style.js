import styled from "styled-components";

import { border } from "../../../style-constants";

export const StyledSection = styled.section`
  margin: 0 auto;
  width: 75%;
`;

export const StyledHeadingH1 = styled.h1`
  margin: 1em 0;
`;

export const StyledSearchForm = styled.form`
  vertical-align: middle;
`;

export const StyledSearchInput = styled.input`
  width: 22em;
  height: 2em;
  font-size: 1em;
  border: ${border};
  box-sizing: border-box;
  padding: 0.25rem;
  font-family: Sahitya;
  outline: none;
`;

export const StyledSearchButton = styled.button`
  margin-left: 0.5em;
  padding: 0.3em 1em;
`;

export const PaginationDiv = styled.div`
  text-align: center;
  margin: 1em 0;
`;
