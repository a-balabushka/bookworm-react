import styled from "styled-components";

import { headerBackground, searchColor, border } from "../../../style-constants";

export const StyledSearch = styled.div`
    font-weight: normal;
    font-style: normal;

    margin-left: 2%;

    color: ${searchColor};

    flex-grow: 2;
`;

export const StyledSearchInput = styled.input`
    font-size: .85em;

    width: 22em;
    height: 2em;
    padding: 0 .25em;

    color: ${searchColor};
    border: ${border};
    border-right: 0;
    outline: none;
    background: ${headerBackground};

  &::-webkit-input-placeholder {
    color: ${searchColor};
  }
`;
