import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { PungField } from "../pung-field";
import { AmountChip } from "../amount-cip";

interface IncreaseFieldProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
}

export const IncreaseField = ({ pungAmount, onPungChange }: IncreaseFieldProps) => {
  const handleChipClick = (amount: number) => {
    onPungChange(pungAmount + amount);
  };

  return (
    <Container>
      <PungField type="charge" pungAmount={pungAmount} />
      <AmountChipRow>
        <AmountChip amount={1000} onClick={() => handleChipClick(1000)} />
        <AmountChip amount={5000} onClick={() => handleChipClick(5000)} />
        <AmountChip amount={10000} onClick={() => handleChipClick(10000)} />
        <AmountChip amount={50000} onClick={() => handleChipClick(50000)} />
      </AmountChipRow>
    </Container>
  );
};

const Container = styled(View)`
  padding: 20px 16px 13px 16px;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  height: 114px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: transparent;
  justify-content: space-between;
  border: 1px solid #262626;
`;

const AmountChipRow = styled(View)`
flex-direction: row;
  gap: 5px;
`;
