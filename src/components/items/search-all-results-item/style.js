import styled from "styled-components";

import { headerBackground } from "../../../style-constants";

export const StyledSearchArticle = styled.article`
  display: flex;
  align-items: center;
  padding: 0.25em 0;
  color: ${headerBackground};
  width: 510px;
  height: 75px;
  margin: 0.75em 0;
`;

export const StyledCover = styled.img`
  height: 75px;
  width: 55px;
`;

export const StyledDataDiv = styled.div`
  padding: 0 1em;
  overflow: hidden;
  width: 100%;
`;

export const StyledTitle = styled.h4`
  margin: 0 0 0.2em 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledAuthor = styled.div`
  margin: 0.15em 0;
  font-size: 0.9em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;


export const StyledRating = styled.div`
  position: relative;
`;

export const StyledRatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;
