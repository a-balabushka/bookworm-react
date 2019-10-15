import styled from "styled-components";

import { border, headerBackground } from "../../../style-constants";

export const StyledContainer = styled.div`
    display: flex;

    height: 3.5em;

    border: ${border};
    border-top: none;

    align-items: center;
`;

export const StyledBookImg = styled.img`
  width: 2.5em;
  height: 100%;
  padding: 0 .5em; 
`;

export const StyledData = styled.div`
  width: 16em;
`;

export const StyledTitle = styled.div`
    font-size: .95em;
    font-weight: bold;

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: ${headerBackground};
`;

export const StyledAuthor = styled.div`
    font-size: .85em;
    font-weight: normal;

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: ${headerBackground};
`;
