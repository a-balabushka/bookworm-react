import styled from "styled-components";

import { border, headerBackground } from "../../../style-constants";

export const StyledContainer = styled.div`
    position: absolute;
    z-index: 10;
    top: 2.5em;

    width: 21em;

    background-color: white;
    box-shadow: 0 .1em .2em rgba(0,0,0,.15);
`;

export const StyledAllResults = styled.div`
    font-size: .9em;
    font-weight: bold;
    
    padding: .5em;

    text-align: center;

    border: ${border};
    border-top: none;
    
    color: ${headerBackground};
`;
