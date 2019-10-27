import styled from "styled-components";
import { accentColorButton, boxShadowButton, wordsColorButton } from "../../../style-constants";

export const Container = styled.form`
  width: 400px;
  height: 330px;
  
  padding: 1em 2em;
  position: absolute;
    
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  
  background: #FFFFFF;
  box-shadow: ${boxShadowButton};
`;

export const Header = styled.h2`
   color: ${accentColorButton};
   margin-bottom: 3em;
   font-size: 1.25em;
`;

export const FormField = styled.div`
  margin: 2em 0;
  text-align: center;
`;

export const FormInput = styled.input`
  width: 90%;
  height: 2.5em;
  font-size: 1em;
  padding: 0 0.8em;
`;

export const Button = styled.button`
  width: 100%;
   padding: 0.75em;
   margin: 1.5em 0;
   color: ${wordsColorButton};
   background-color: ${accentColorButton};
   font-size: 1em;
   font-weight: 600;
   border: none;
   cursor: pointer;
`;
