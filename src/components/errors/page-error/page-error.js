import React from "react";

import * as S from "./style";
import pageError from "../../../img/error.png";

const PageError = ({ title }) => {
  return (
    <S.Container>
      <S.ImgError src={pageError} alt="Something went wrong" />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
};

export default PageError;
