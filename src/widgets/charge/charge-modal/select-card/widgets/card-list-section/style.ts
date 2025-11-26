import { Text } from "react-native";
import { View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  padding: 18px 15px 12px 15px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
`;

export const Title = styled(View)`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
  width: 100%;
  margin-bottom: 5px;
`;
export const CardListContainer = styled(View)`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: ${({ theme }) => theme.borders.small};
  background-color: ${({ theme }) => theme.colors.background.normal};
  align-items: flex-start;
`;

export const LoadingText = styled(View)`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
  text-align: center;
  padding: 20px;
`;

export const EmptyText = styled(Text)`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: ${({ theme }) => theme.font.medium};
  text-align: center;
  padding: 20px;
`;
