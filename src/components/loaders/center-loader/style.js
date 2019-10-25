import styled from "styled-components";

import { headerBackground } from "../../../style-constants";

export const StyledSpinner = styled.svg`
    width: 2.5em;
    height: 2.5em;

    position: absolute;
    
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;

    animation: rotate 2s linear infinite;

    stroke: ${headerBackground};
  
    & .path {
      animation: dash 1.5s ease-in-out infinite;
      
      stroke: hsl(210, 70, 75);
      stroke-linecap: round;
    }
    
    @keyframes rotate {
    100% {
      transform: rotate(360deg);
      }
    }
  
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }  
`;

export const StyledContainer = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   overflow: auto;
`;
