import React from "react";
import styled from "styled-components";
import Loading from "./Loading";

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ItemWrapper = styled.li`
  background-color: #f9f9f9;
  padding: 10px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  margin-top: -1px;
  margin-bottom: -1px;
  font-size: 12px;
  text-align: left;
`;

const LoadingContainer = styled.div`
  position: absolute;
  background-color: rgba(255,255,255, 0.8);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
`;

const ListItem = React.memo(({ children }) => (
  <ItemWrapper data-testid="list-item">{children}</ItemWrapper>
));

const List = React.memo(({ texts = [], showLoading = false }) => {
  return (
    <Wrapper data-testid="list">
      {showLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {texts.map((
        text,
        index /** eu sei, isso não é correto, mas é só um exemplo :p*/
      ) => (
        <ListItem key={index}>{text}</ListItem>
      ))}
    </Wrapper>
  );
});

export default List;
