import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Loading from "./Loading";

const Wrapper = styled.header`
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 10px;
  text-transform: uppercase;
  margin-right: 10px;
`;

const Header = ({ showLoading = false, onFetchTexts }) => {
  return (
    <Wrapper data-testid="header">
      <Title>React and xState</Title>
      {showLoading && <Loading />}
      <Button onClick={onFetchTexts}>Fetch random text</Button>
    </Wrapper>
  );
};

export default Header;
