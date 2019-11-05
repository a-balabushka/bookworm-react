import styled from "styled-components";

import { wordsColorButton, accentColorButton } from "../../../style-constants";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-around;
`;

export const FormField = styled.div`
  margin: 1em 0;
  text-align: center;
`;

export const FormInput = styled.input`
  width: 90%;
  height: 2.5em;
  font-size: 1em;
  padding: 0 0.8em;
`;

export const SingUpButton = styled.button`
   width: 100%;
   padding: 0.75em;
   margin-top: 2em;
   color: ${wordsColorButton};
   background-color: ${accentColorButton};
   font-size: 1em;
   font-weight: 600;
   border: none;
   cursor: pointer;
`;


