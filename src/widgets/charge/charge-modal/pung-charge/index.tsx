import styled from "styled-components/native";
import { FinalAmountField } from "../ui/final-amount-field";
import { SubmitButton } from "@/ui/SubmitButton";
import { IncreaseField } from "../ui/increase-field";
import { AgreeRow } from "../ui/agree-row";
import { View } from "react-native";

interface PungChargeProps {
  pungAmount: number;
  onPungChange: (amount: number) => void;
  toPaymentChoice: () => void;
}

export const PungCharge = ({ pungAmount, onPungChange, toPaymentChoice }: PungChargeProps) => {

  return (
    <Container>
      <IncreaseField pungAmount={pungAmount} onPungChange={onPungChange} />
      <FinalAmountField pungAmount={pungAmount} />
      <AgreeRow />
      <SubmitButton onClick={toPaymentChoice}>결제수단 선택하기</SubmitButton>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: column;
  gap: 15px;
  padding: 0 20px;
`;
