import styled from "styled-components";

import { accentColorButton, boxShadowButton, wordsColorButton } from "../../../style-constants";


export const StyledStat = styled.div`
    text-align: center;
    font-size: 0.8em;
    margin-bottom: 1.25em;
`;

export const StyledButton = styled.button`
  background-color: ${accentColorButton};
  width: 100%;
  padding: 0.8em 0;
  font-size: 0.75em;
  margin: 0.35em 0;
  font-weight: 600;
  color: ${wordsColorButton};
  box-shadow: ${boxShadowButton};
`;

export const StyledProgress = styled.progress`
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 2.5em;
  margin: 0.2em 0;
`;

export const StyledDiv = styled.div`
  font-size: 0.8em;
  margin-bottom: 1em;
  text-align: center;
`;
