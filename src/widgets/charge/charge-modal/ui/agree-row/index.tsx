import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

export const AgreeRow = () => {
  return (
    <Row>
      <LeftText>내용을 확인했으며 펑 충전에 동의합니다.</LeftText>
      <RightText>안내보기</RightText>
    </Row>
  );
};

const Row = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftText = styled(Text)`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
const RightText = styled(Text)`
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-decoration: underline;
`;

