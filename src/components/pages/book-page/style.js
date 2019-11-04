import styled from "styled-components";

import { borderColor, sectionWidth } from "../../../style-constants";

export const Section = styled.div`
  margin: 3em auto;
  width: ${sectionWidth};
  display: flex;
  flex-wrap: wrap;
`;

/* --------------------- LEFT ----------------------- */

export const Left = styled.div`
  text-align: center;
  width: 10em;
`;

export const Cover = styled.img`
  width: 160px;
  height: 220px;
`;

/* --------------------- CENTER ---------------------- */

export const Center = styled.div`
  margin: 0 1.25em;
  width: 41em;
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25em;
  font-size: 1.4em;
`;

export const Author = styled.div`
  font-size: 1.25em;
  margin-bottom: 0.25em;
`;

export const Rating = styled.div`
  position: relative;
  margin-bottom: 1.5em;
`;

export const RatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;

export const Description = styled.div`
  text-align: justify;
  padding-bottom: 1.25em;
  border-bottom: 1px solid ${borderColor};
`;

export const Publish = styled.div`
  padding-top: 1.25em;
  font-size: 0.8em;
`;

/* --------------------- RIGHT ---------------------- */

export const Right = styled.div`
  width: 10em;
`;

export const ProgressHeader = styled.h4`
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
`;
