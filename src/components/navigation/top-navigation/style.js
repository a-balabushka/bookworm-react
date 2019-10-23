import styled from "styled-components";

import { headerBackground } from "../../../style-constants";

export const StyledHeader = styled.header`
  height: 50px;
  
  display: flex;
  padding: 0 5% 0 0;
  align-items: center;
  position: relative;
  
  background: ${headerBackground};
`;

export const StyledMenuIcon = styled.img`
  margin: 0 2% 0 1%;
`;

export const StyledIcon = styled.img`
  margin: 0 0.8em;
`;
