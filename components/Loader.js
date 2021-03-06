import React from "react";
import styled from "styled-components/native";

export const Loader = () => {
  return <Spinner size="large" color="#64b241" />;
};

const Spinner = styled.ActivityIndicator`
  margin-top: 20px;
`;
