import React from "react";

import "./action-multiple-delete-button.css";
import styled from "styled-components";
const ActionMultipleDeleteButton = styled.button`
  background-color: #2979ff;
  border: none;
  color: white;
  padding: 8px 32px 8px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

export default ({ children, ...rest }) => (
  <ActionMultipleDeleteButton {...rest}>{children}</ActionMultipleDeleteButton>
);
