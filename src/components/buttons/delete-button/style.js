import styled from "styled-components";

import { darkColorButton, boxShadowButton, wordsColorButton } from "../../../style-constants";

export const StyledButton = styled.button`
  background-color: ${darkColorButton};
    width: 100%;
    padding: 0.6em 0;
    font-size: 0.9em;
    margin: 0.35em 0;
    font-weight: 600;
    color: ${wordsColorButton};
    box-shadow: ${boxShadowButton};
`;
