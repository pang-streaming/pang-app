

import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

interface AmountChipProps {
  amount: number;
  onClick?: () => void;
}

export const AmountChip = ({ amount, onClick }: AmountChipProps) => {
  return (
    <Container onPress={onClick}>
      <Amount>{amount.toLocaleString()}</Amount>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 86px;
  height: 28px;
  border-radius: ${({theme}) => theme.borders.maximum};
  border: ${({ theme }) => theme.borders.maximum};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #737373;
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.normal};
    background-color: ${({ theme }) => theme.colors.primary.normal}20;
  }
`;

const Amount = styled(Text)`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;
