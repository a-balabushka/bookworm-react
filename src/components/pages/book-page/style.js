import styled from "styled-components";

import { borderColor } from "../../../style-constants";

export const StyledSection = styled.div`
  margin: 3em auto;
  width: 1024px;
  display: flex;
  flex-wrap: wrap;
`;

/* --------------------- LEFT ----------------------- */

export const StyledLeft = styled.div`
  text-align: center;
  width: 10em;
`;

export const StyledCover = styled.img`
  width: 160px;
  height: 220px;
`;

/* --------------------- CENTER ---------------------- */

export const StyledCenter = styled.div`
  margin: 0 1.25em;
  width: 41em;
`;

export const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25em;
  font-size: 1.4em;
`;

export const StyledAuthor = styled.div`
  font-size: 1.25em;
  margin-bottom: 0.25em;
`;

export const StyledRating = styled.div`
  position: relative;
  margin-bottom: 1.5em;
`;

export const StyledRatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;

export const StyledDescription = styled.div`
  text-align: justify;
  padding-bottom: 1.25em;
  border-bottom: 1px solid ${borderColor};
`;

export const StyledPublish = styled.div`
  padding-top: 1.25em;
  font-size: 0.8em;
`;

/* --------------------- RIGHT ---------------------- */

export const StyledRight = styled.div`
  width: 10em;
`;

export const StyledProgressHeader = styled.h4`
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
`;
