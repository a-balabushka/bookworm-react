import React from 'react';
import styled from "styled-components";

const ConfirmEmailMessage = () => (
  <Container>
    <Message>Please, verify your email to unlock awesomeness</Message>
  </Container>
);

const Container = styled.div`
  border: 1px solid #b58105;
  background-color: #fff8db;
  text-align: center;
  color: #b58105;
  margin: 1em;
`;

const Message = styled.p`
  margin: 0.5em 0;
`;

export default ConfirmEmailMessage;
