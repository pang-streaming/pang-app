import styled from 'styled-components/native';
import { useState } from 'react';
import { SubmitButton } from '@/ui/SubmitButton';
import { FinalAmountField } from '../ui/final-amount-field';
import { CardListSection } from './widgets/card-list-section';
import { AddCardSection } from './widgets/add-card-section';
import { View } from 'react-native';

interface Props {
  pungAmount: number;
  toPaymentAdd: () => void;
  onBackToPungCharge: () => void;
  onCardAdded?: () => void;
  cardRefreshTrigger?: number;
  onCharge?: (cardId: string, amount: number) => void;
}

export const SelectCard = ({ pungAmount, toPaymentAdd, onBackToPungCharge, cardRefreshTrigger, onCharge }: Props) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(undefined);

  const handleCharge = async () => {
    if (selectedCardId && onCharge) {
      await onCharge(selectedCardId, pungAmount);
    }
  };

  return (
    <Container>
        <CardListSection
          refreshTrigger={cardRefreshTrigger}
          selectedCardId={selectedCardId}
          onCardSelect={setSelectedCardId}
        />
        <AddCardSection toPaymentAdd={toPaymentAdd} />
        <FinalAmountField pungAmount={pungAmount} />
        <SubmitButton
          onClick={handleCharge}
          disabled={!selectedCardId}
        >
          펑 충전하기
        </SubmitButton>
    </Container>
  )
}


export const Container = styled.View`
  flex-direction: column;
  gap: 15px;
`;
