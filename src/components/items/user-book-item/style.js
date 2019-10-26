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

export const StyledCenter = styled.div`
  width: 220px;
  margin: 0 15px;
`;

export const StyledTitle = styled.h4`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledAuthor = styled.div`
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

export const StyledButtonsDiv = styled.div`
  text-align: center;
  margin-top: 1.75em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const StyledButtonItem = styled.div`
  width: 40%;
`;

export const StyledRight = styled.div`
  margin-rigth: 25px;
  width: 120px;
  text-align: center
`;

export const StyledProgressH5 = styled.h5`
  margin-top: 0.85em;
`;
