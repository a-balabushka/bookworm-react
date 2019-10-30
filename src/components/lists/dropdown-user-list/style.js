import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    font-size: 0.85em;
    padding: 0.25em 0.75em;
    text-align: center;
    z-index: 10;
    top: 3.25em;
    right: 5em;
    background-color: #414141;
    box-shadow: 0 0.1em 0.2em rgba(0,0,0,.15)
`;

export const Item = styled.div`
  margin: 0.5em 0;
`;

export const Button = styled.button`
    background-color: #414141;
    border: none;
    color: white;
    font-size: 1.1em;
`;
