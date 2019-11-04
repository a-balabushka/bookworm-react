import styled from "styled-components";

import { border, sectionWidth, boxShadowButton, wordsColorButton, accentColorButton } from "../../../style-constants";

export const Container = styled.div`
  margin: 0 auto;
  width: ${sectionWidth};
`;

export const HeadingH1 = styled.h1`
  margin: 1em 0;
`;

export const SearchForm = styled.form`
  text-align: center;
`;

export const SearchInput = styled.input`
  width: 25em;
  height: 2em;
  font-size: 1em;
  border: ${border};
  box-sizing: border-box;
  padding: 0.25rem;
  outline: none;
`;

export const SearchButton = styled.button`
  margin-left: 0.5em;
    padding: 0.45em 1.5em;
    font-weight: 600;
    background-color: ${accentColorButton};
    color: ${wordsColorButton};
    box-shadow: ${boxShadowButton};
}

`;

export const Results = styled.div`
  font-size: 0.9em;
  text-align: center;
  margin-top: 1.5em;
`;

export const PaginationDiv = styled.div`
  text-align: center;
  margin: 1em 0;
`;
