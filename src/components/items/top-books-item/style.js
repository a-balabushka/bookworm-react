import styled from "styled-components";

export const StyledArticle = styled.article`
  width: 510px;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
`;

export const StyledLeft = styled.div`
  width: 100px;
`;

export const StyledCover = styled.img`
  width: 100px;
  height: 150px;
  margin-bottom: 0.9em;
`;

export const StyledRight = styled.div`
  width: 340px;
  margin: 0 45px 0 15px;
`;

export const StyledTitle = styled.h4`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledAthor = styled.div`
  margin: 0.35em 0;
  font-size: 0.85em;
`;

export const StyledRating = styled.div`
  position: relative;
  margin-bottom: 0.4em;
`;

export const StyledRatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;

export const StyledDescription = styled.div`
  width: 100%; 
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  -webkit-line-clamp: 6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 0.85em;
`;
