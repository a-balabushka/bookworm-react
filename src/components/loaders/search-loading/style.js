import styled from "styled-components";

import { border, searchColor } from "../../../style-constants";

export const StyledContainer = styled.div`
    position: absolute;

    display: inline;

    width: 1.7em;
    height: 1.5em;
    padding: .1em 0;

    text-align: center;

    border: ${border};
    border-left: none;
`;

export const StyledSearchImg = styled.img`
    position: absolute;

    padding: .17em;

    vertical-align: middle;

    border: ${border};
    border-left: none;
`;

export const StyledSpinner = styled.svg`
    width: 1.25em;
    height: 1.5em;

    animation: rotate 2s linear infinite;

    stroke: ${searchColor};
  
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
